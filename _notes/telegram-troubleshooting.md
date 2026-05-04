# 텔레그램 수신 불가 문제 — 진단 및 해결

## 증상
- Claude → 텔레그램 (송신): 정상 작동
- 텔레그램 → Claude (수신): 메시지가 Claude 창에 나타나지 않음

## 원인
텔레그램 인바운드 폴링을 담당하는 **봇 프로세스가 죽어있음**.

- `~/.claude/channels/telegram/bot.pid` 에 저장된 PID(26812)가 이미 종료된 상태
- 실행 중인 Node.js 봇 프로세스 없음
- 웹훅도 없음 (getWebhookInfo 결과: url="", pending=0)
- `/reload-plugins` 는 MCP 도구만 리로드하고 봇 폴링 프로세스는 재시작하지 않음

## 배경
두 번째 텔레그램 봇을 만들어 `C:\Users\lette\claude_project\3_2sangnewletter` 프로젝트에 연결했다가
봇 삭제 + 창 종료 과정에서 첫 번째 봇의 폴링 프로세스가 비정상 종료된 것으로 추정.

## 해결책
**Claude Code 완전 재시작** (창 닫고 다시 열기)

재시작하면 텔레그램 플러그인이 새 봇 프로세스를 띄우고 bot.pid를 갱신함.

## 재시작 후 확인 방법
PowerShell에서 아래 명령으로 봇 프로세스 정상 실행 확인:
```
Get-Content "$env:USERPROFILE\.claude\channels\telegram\bot.pid"
Get-Process -Id <위 PID> -ErrorAction SilentlyContinue
```
PID가 살아있고, 텔레그램에서 메시지를 보내면 Claude 창에 뜨면 정상.

## 현재 설정 상태 (정상)
- 봇 토큰: 설정됨 (8609199065:...)
- dmPolicy: allowlist
- 허용 사용자 ID: 8511761077
