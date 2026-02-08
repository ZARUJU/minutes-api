export type MeetingIndexItem = {
  meetingId: string
  title: string
  date: string
}

export type MeetingIndex = {
  meetings: MeetingIndexItem[]
}

export type MeetingRecord = {
  schema_version: string
  meetingId: string
  title: string
  date: string
  source: {
    url: string
    fetched_at: string
    original_type: 'minutes' | 'summary'
  }
  body: {
    summary: string
    items: string[]
  }
}
