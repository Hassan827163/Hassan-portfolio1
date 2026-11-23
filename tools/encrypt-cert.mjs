#!/usr/bin/env node
/* =========================================================================
   tools/encrypt-cert.mjs — encrypt certificate files for the private vault
   Requires Node.js 18+ (no npm install needed).

   1) Create your vault verifier (once) and paste it into CONFIG.vault.verifier
        node tools/encrypt-cert.mjs --verifier

   2) Encrypt certificate files (PDF / PNG / JPG / WEBP)
        node tools/encrypt-cert.mjs private/deep-learning.pdf private/toeic.jpg
      → writes certificates/deep-learning.pdf.enc, certificates/toeic.jpg.enc

   Options:
        --out <dir>      output folder (default: certificates)

   Passphrase: typed at the prompt, or set env var VAULT_PASSPHRASE.
   Use the SAME passphrase for the verifier and every file.

   Format: [16-byte salt][12-byte IV][AES-256-GCM ciphertext+tag],
           key = PBKDF2-SHA256(passphrase, salt, 600 000 iterations).
   Must match VAULT_ITERATIONS / VAULT_VERIFIER_TEXT in script.js.
========================================================================= */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { webcrypto as crypto } from 'node:crypto';
import path from 'node:path';
import readline from 'node:readline';

const ITERATIONS = 600000;
const VERIFIER_TEXT = 'portfolio-vault-ok';

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const write = rl._writeToOutput.bind(rl);
    rl._writeToOutput = (s) => { if (s.includes(question)) write(s); else write('*'); };
    rl.question(question, (answer) => { rl.close(); process.stdout.write('\n'); resolve(answer); });
  });
}

async function getPassphrase(confirm) {
  if (process.env.VAULT_PASSPHRASE) return process.env.VAULT_PASSPHRASE;
  const p = await askHidden('Vault passphrase: ');
  if (confirm) {
    const p2 = await askHidden('Repeat passphrase: ');
    if (p !== p2) { console.error('✗ Passphrases do not match.'); process.exit(1); }
  }
  return p;
}

async function encrypt(bytes, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
  const out = new Uint8Array(16 + 12 + ct.length);
  out.set(salt, 0); out.set(iv, 16); out.set(ct, 28);
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.includes('-h') || args.includes('--help')) {
    console.log('Usage:\n  node tools/encrypt-cert.mjs --verifier\n  node tools/encrypt-cert.mjs [--out certificates] <file> [file...]');
    return;
  }

  if (args.includes('--verifier')) {
    const pass = await getPassphrase(true);
    if (pass.length < 12) console.warn('⚠ Use at least 12 characters (a few random words is ideal).');
    const v = await encrypt(new TextEncoder().encode(VERIFIER_TEXT), pass);
    console.log('\nPaste this into CONFIG.vault.verifier in script.js:\n');
    console.log(Buffer.from(v).toString('base64'));
    return;
  }

  let outDir = 'certificates';
  const files = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out') outDir = args[++i];
    else files.push(args[i]);
  }

  const pass = await getPassphrase(false);
  await mkdir(outDir, { recursive: true });
  for (const f of files) {
    const data = await readFile(f);
    const enc = await encrypt(new Uint8Array(data), pass);
    const out = path.join(outDir, `${path.basename(f)}.enc`);
    await writeFile(out, enc);
    console.log(`✓ ${f}  →  ${out}`);
    console.log(`    file: '${out.split(path.sep).join('/')}',`);
  }
  console.log('\nReminder: commit only the .enc files — never the originals.');
}

main().catch((e) => { console.error(e); process.exit(1); });
