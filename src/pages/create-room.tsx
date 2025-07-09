import { Link } from 'react-router-dom'

export function CreateRoom() {
  return (
    <div>
      <h1>Create Room</h1>

      <Link className="underline" to="/room/1">
        Acessar sala
      </Link>
    </div>
  )
}
