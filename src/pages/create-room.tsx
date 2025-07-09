import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type GetRoomsAPIResponse = {
  rooms: Array<{
    id: string
    name: string
  }>
}

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsAPIResponse = await response.json()

      const { rooms } = result

      return rooms
    },
  })

  return (
    <main className="flex flex-col gap-8 p-4">
      <h1>Create Room</h1>

      {isLoading && <Loader2 className="animate-spin" />}

      <div className="flex flex-col items-start gap-4">
        {data?.map((room) => (
          <Button key={room.id}>
            <Link to={`/room/${room.id}`}>{room.name}</Link>
          </Button>
        ))}
      </div>
    </main>
  )
}
