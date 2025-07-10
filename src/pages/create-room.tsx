import { RoomList } from '@/components/pages/create-room/room-list'

export function CreateRoom() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          {/* FORM CREATE QUESTION */}
          <div />

          <RoomList />
        </div>
      </div>
    </main>
  )
}
