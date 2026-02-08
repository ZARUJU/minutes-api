import type { Context } from 'hono'
import type { AppEnv } from '../types/api'
import type { MeetingIndex, MeetingRecord } from '../types/meeting'

export const isSafeMeetingId = (meetingId: string) => /^[A-Za-z0-9._-]+$/.test(meetingId)

const fetchAssetJson = async (c: Context<AppEnv>, path: string): Promise<unknown | null> => {
  const url = new URL(c.req.url)
  url.pathname = path
  url.search = ''

  const response = await c.env.ASSETS.fetch(new Request(url.toString(), { method: 'GET' }))
  if (!response.ok) {
    return null
  }

  return response.json()
}

export const fetchMeetingsIndex = async (c: Context<AppEnv>): Promise<MeetingIndex | null> => {
  const payload = await fetchAssetJson(c, '/data/index.json')
  return (payload as MeetingIndex) ?? null
}

export const fetchMeetingById = async (c: Context<AppEnv>, meetingId: string): Promise<MeetingRecord | null> => {
  const payload = await fetchAssetJson(c, `/data/meetings/${meetingId}.json`)
  return (payload as MeetingRecord) ?? null
}
