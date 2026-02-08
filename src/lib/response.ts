import type { Context } from 'hono'

export const jsonResponse = (c: Context, payload: unknown, status = 200) => {
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Cache-Control', 'public, max-age=60')
  c.header('Content-Type', 'application/json; charset=utf-8')
  return c.json(payload, status)
}
