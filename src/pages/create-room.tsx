import { CreateRoomForm } from '@/components/pages/create-room/create-room-form'
import { RoomList } from '@/components/pages/create-room/room-list'

export function CreateRoom() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />

          <RoomList />
        </div>
      </div>
    </main>
  )
}
