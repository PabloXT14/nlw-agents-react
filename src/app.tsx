import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { CreateRoom } from './pages/create-room'
import { CreateRoomAudio } from './pages/create-room-audio'
import { Room } from './pages/room'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          <Route element={<Room />} path="/room/:roomId" />
          <Route element={<CreateRoomAudio />} path="/room/:roomId/audio" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
