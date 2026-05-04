# 텔레그램 봇 폴링 불가 문제 해결

## 증상
Claude Code를 재시작해도 텔레그램 봇이 응답하지 않음.
봇 API 자체는 살아있음 (sendMessage로 메시지 전송 가능, getUpdates로 수신 확인 가능).
MCP 서버(폴링 프로세스)만 실행 안 됨.

## 원인

`.env` 파일의 줄바꿈 + 인코딩 문제 2가지가 복합적으로 발생.

### 1차 원인: Windows 줄바꿈 (`\r\n`)
- 파일: `C:\Users\lette\.claude\channels\telegram\.env`
- bun이 파일을 읽으면 줄 끝에 `\r`이 붙음
- 서버 코드의 regex `/^(\w+)=(.*)$/`가 `\r` 앞에서 `$` 매칭 실패
- 결과: 토큰을 읽지 못하고 `TELEGRAM_BOT_TOKEN required` 에러로 종료

### 2차 원인: BOM (Byte Order Mark)
- PowerShell `[System.IO.File]::WriteAllText(..., UTF8)`로 수정 시 BOM(`﻿`) 삽입됨
- regex `^(\w+)` 앞에 보이지 않는 BOM 문자가 붙어 다시 매칭 실패

## 해결 방법

PowerShell에서 **UTF-8 without BOM + Unix 줄바꿈(`\n`)**으로 재작성:

```powershell
$token = "실제_봇_토큰"
$content = "TELEGRAM_BOT_TOKEN=$token`n"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText(
    "C:\Users\lette\.claude\channels\telegram\.env",
    $content,
    $utf8NoBom
)
```

결과: 파일 크기 66 bytes, BOM 없음, 마지막 바이트 `0A`(\n).

## 확인 방법

수정 후 서버 수동 테스트:

```powershell
$pluginRoot = "C:\Users\lette\.claude\plugins\cache\claude-plugins-official\telegram\0.0.6"
$p = Start-Process bun -ArgumentList "run","--cwd",$pluginRoot,"--shell=bun","start" -PassThru -NoNewWindow -RedirectStandardError "$env:TEMP\tg_err.txt"
Start-Sleep 8
$p | Stop-Process -Force
Get-Content "$env:TEMP\tg_err.txt"
```

성공 시 출력:
```
telegram channel: polling as @sangkrbot
```

## 봇 정보
- 봇 이름: `@sangkrbot` (2sangkrbot)
- 허용 사용자 ID: `8511761077` (Momo)
- 접근 정책: `allowlist` (잠금 상태)
- 플러그인 경로: `C:\Users\lette\.claude\plugins\cache\claude-plugins-official\telegram\0.0.6\`
- 상태 디렉토리: `C:\Users\lette\.claude\channels\telegram\`

## 재발 주의
Claude Code 재설치나 `telegram:configure` 스킬로 토큰을 다시 저장하면
PowerShell 기본 인코딩으로 `.env`가 덮어써져 같은 문제가 재발할 수 있음.
토큰 재저장 후에는 반드시 위 PowerShell 명령으로 파일을 UTF-8 without BOM으로 재작성할 것.

---

## 2026-05-02 전체 초기화 및 재설정

### 배경
텔레그램 → Claude Code 수신이 안 되는 문제 재발. sendMessage(봇→텔레그램)는 정상 작동.

### 원인 파악 과정
1. 폴링 서버 수동 테스트 실행 → `replacing stale poller pid=11096` 출력
   - 기존에 실행 중이던 폴러가 있었음을 의미
   - 테스트 프로세스가 기존 폴러를 교체 후 8초 뒤 강제 종료 → 폴링 완전 중단
2. MCP 도구 연결 끊김 (`plugin:telegram:telegram disconnected`)

### 해결: 로컬 상태 전체 초기화 (Option A)

**Step 1 — bun 프로세스 전체 종료**
```powershell
Get-Process bun -ErrorAction SilentlyContinue | Stop-Process -Force
```

**Step 2 — channels/telegram 폴더 삭제**
```powershell
Remove-Item "C:\Users\lette\.claude\channels\telegram" -Recurse -Force
```

**Step 3 — 플러그인 캐시 삭제**
```powershell
Remove-Item "C:\Users\lette\.claude\plugins\cache\claude-plugins-official\telegram" -Recurse -Force
```

**Step 4 — .env 재생성 (UTF-8 without BOM)**
```powershell
$dir = "C:\Users\lette\.claude\channels\telegram"
New-Item -ItemType Directory -Path $dir -Force | Out-Null
$token = "실제_봇_토큰"
$content = "TELEGRAM_BOT_TOKEN=$token`n"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("$dir\.env", $content, $utf8NoBom)
```
확인: 파일 크기 66 bytes, 마지막 바이트 `0x0A`

**Step 5 — access.json 재생성**
```powershell
$access = @{
    dmPolicy = "allowlist"
    allowlist = @(@{ id = "8511761077"; name = "Momo" })
    pendingPairings = @()
} | ConvertTo-Json -Depth 5
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("$dir\access.json", $access, $utf8NoBom)
```

**Step 6 — Claude Code 완전 재시작**
플러그인 캐시가 삭제됐으므로 재시작 시 플러그인 재다운로드 + 폴링 자동 시작.

### 주의
- 수동 테스트(`Start-Process bun ... Stop-Process`)는 실행 중인 폴러를 교체·종료시킬 수 있음 → MCP 연결 끊김 유발
- 테스트 후 반드시 Claude Code 재시작 필요

---

## 2026-05-02 재발 (2차)

### 증상
텔레그램 → Claude 수신 불가. 약 10시간 디버깅.

### 진단 결과
| 항목 | 상태 |
|------|------|
| 웹훅 | 없음 (url: "") |
| pending_update_count | 4 (메시지 쌓임, Case B) |
| bun 프로세스 | 초반 PID 27716 좀비 → 강제 종료 후 미실행 |
| 플러그인 캐시 | 정상 (0.0.6 존재) |
| channels/telegram/.env | **없음** ← 핵심 원인 |
| channels/telegram/access.json | **없음** |

### 원인
`channels/telegram` 폴더는 존재하나 내부 파일이 모두 사라진 상태.
플러그인이 토큰을 읽지 못해 bun 폴러 자체가 실행되지 않음.

### 해결
.env와 access.json을 UTF-8 without BOM으로 재생성:

```powershell
$dir = "C:\Users\lette\.claude\channels\telegram"
$token = "실제_봇_토큰"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# .env
$content = "TELEGRAM_BOT_TOKEN=$token`n"
[System.IO.File]::WriteAllText("$dir\.env", $content, $utf8NoBom)

# access.json
$access = '{"dmPolicy":"allowlist","allowlist":[{"id":"8511761077","name":"Momo"}],"pendingPairings":[]}'
[System.IO.File]::WriteAllText("$dir\access.json", $access, $utf8NoBom)
```

확인: .env 66 bytes, 마지막 바이트 0x0A → Claude Code 재시작

### 재발 패턴 추정
channels/telegram 내부 파일이 사라지는 경위 불명확.
이전 리셋 과정에서 폴더 삭제 후 재생성 시 파일이 누락됐을 가능성.
재발 시 폴더 내 파일 유무부터 확인할 것.

---

## 2026-05-02 3차 — bun stuck 상태 진단

### 증상
텔레그램 → Claude 수신 불가. bun 프로세스는 살아있음(PID 2984).

### 진단 결과
| 항목 | 상태 |
|------|------|
| .env | 정상 (66 bytes, no BOM) |
| access.json | 정상 (Momo allowlist) |
| bot.pid | 2984 (어제 22:35 시작) |
| bun 프로세스 | PID 2984 살아있으나 폴링 stuck 상태로 추정 |
| bun 설치 경로 | `C:\Users\lette\.bun\bin\bun.exe` |

### 원인
bun 프로세스가 살아있어도 폴링이 실제로 동작하지 않는 stuck 상태 가능.
MCP 서버(플러그인)와 bun 프로세스 사이 연결이 끊어진 상태.

### 해결 절차
별도 PowerShell 창에서:
```powershell
# 1. stuck bun 종료
Get-Process bun -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. 좀비 PID 파일 제거
Remove-Item "C:\Users\lette\.claude\channels\telegram\bot.pid" -Force -ErrorAction SilentlyContinue
```
이후 **Claude Code 완전 재시작** (창 닫고 다시 열기).

### 주의: bun PATH 문제
새 PowerShell 창에서 `bun --version`이 빈 결과 → PATH에 없는 것처럼 보임.
실제 경로: `C:\Users\lette\.bun\bin\bun.exe`
Claude Code 자체는 내부적으로 bun을 찾아 실행하므로 문제 없음.
수동 테스트 시에는 `& "C:\Users\lette\.bun\bin\bun.exe" --version` 사용.

### 빠른 진단 체크리스트 (재발 시)
1. `Get-Content "C:\Users\lette\.claude\channels\telegram\bot.pid"` → PID 확인
2. `Get-Process -Id <PID>` → 프로세스 살아있나?
3. 살아있어도 메시지 안 오면 → stuck 상태. 위 해결 절차 실행.
