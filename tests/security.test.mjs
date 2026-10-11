import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../src/lib/security.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { safeJsonLd, validSecret } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
test('structured data cannot close its script element and preserves content', () => {
  const value = { name: '</script><script>alert(1)</script>', description: '한글 작품 < & >' };
  const serialized = safeJsonLd(value);
  assert.equal(serialized.includes('<'), false);
  assert.deepEqual(JSON.parse(serialized), value);
});
test('missing or mismatched credentials always fail closed', () => {
  for (const [received, expected] of [[null, undefined], ['', ''], ['Bearer undefined', undefined], ['wrong', 'expected']]) assert.equal(validSecret(received, expected), false);
  assert.equal(validSecret('correct', 'correct'), true);
});
