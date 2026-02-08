import { Hono } from 'hono'
import { fetchMeetingById, fetchMeetingsIndex, isSafeMeetingId } from './lib/meetings'
import { jsonResponse } from './lib/response'
import type { AppEnv } from './types/api'

const app = new Hono<AppEnv>()

app.get('/', (c) => {
  return c.text('Minutes API sample is running')
})

app.get('/meetings', (c) => {
  return fetchMeetingsIndex(c).then((payload) => {
    if (!payload) {
      return jsonResponse(c, { error: 'Meetings index not found' }, 404)
    }
    return jsonResponse(c, payload)
  })
})

app.get('/meetings/:meetingId.json', async (c) => {
  const meetingId = c.req.param('meetingId')
  if (!isSafeMeetingId(meetingId)) {
    return jsonResponse(c, { error: 'Invalid meetingId', meetingId }, 400)
  }
  const meeting = await fetchMeetingById(c, meetingId)
  if (!meeting) {
    return jsonResponse(c, { error: 'Meeting not found', meetingId }, 404)
  }
  return jsonResponse(c, meeting)
})

app.get('/meetings/:meetingId', async (c) => {
  const meetingId = c.req.param('meetingId')
  if (!isSafeMeetingId(meetingId)) {
    return jsonResponse(c, { error: 'Invalid meetingId', meetingId }, 400)
  }
  const meeting = await fetchMeetingById(c, meetingId)
  if (!meeting) {
    return jsonResponse(c, { error: 'Meeting not found', meetingId }, 404)
  }
  return jsonResponse(c, meeting)
})

app.onError((err, c) => {
  console.error(err)
  return jsonResponse(c, { error: 'Internal Server Error' }, 500)
})

export default app
