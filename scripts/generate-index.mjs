import { readdir, readFile, writeFile } from 'node:fs/promises'
import { extname } from 'node:path'

const meetingsDir = new URL('../data/meetings/', import.meta.url)
const indexFile = new URL('../data/index.json', import.meta.url)

const files = await readdir(meetingsDir)
const meetings = []

for (const file of files) {
  if (extname(file) !== '.json') {
    continue
  }

  const fileUrl = new URL(file, meetingsDir)
  const raw = await readFile(fileUrl, 'utf8')
  const record = JSON.parse(raw)

  if (
    typeof record.meetingId !== 'string' ||
    typeof record.title !== 'string' ||
    typeof record.date !== 'string'
  ) {
    throw new Error(`Invalid meeting file: ${file}`)
  }

  meetings.push({
    meetingId: record.meetingId,
    title: record.title,
    date: record.date,
  })
}

meetings.sort((a, b) => a.meetingId.localeCompare(b.meetingId, 'en'))

const output = {
  meetings,
}

await writeFile(indexFile, `${JSON.stringify(output, null, 2)}\n`, 'utf8')

console.log(`Generated data/index.json from ${meetings.length} meeting file(s)`)
