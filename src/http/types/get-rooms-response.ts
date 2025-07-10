export type GetRoomsResponse = {
  rooms: Array<{
    id: string
    name: string
    createdAt: string
    questionsCount: number
  }>
}
