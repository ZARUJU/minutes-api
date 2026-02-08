import { cp, mkdir, rm } from 'node:fs/promises'

const srcDir = new URL('../data', import.meta.url)
const outDir = new URL('../public/data', import.meta.url)

await rm(outDir, { recursive: true, force: true })
await mkdir(new URL('../public', import.meta.url), { recursive: true })
await cp(srcDir, outDir, { recursive: true })

console.log('Synced data/ -> public/data/')
