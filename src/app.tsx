import { Wand } from 'lucide-react'
import { Button } from './components/ui/button'

export function App() {
  return (
    <main className="flex flex-col items-start gap-4 p-4">
      <h1>Let me Ask</h1>

      <Button>Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="link">Click me</Button>
      <Button variant="destructive">Click me</Button>

      <Button size="icon">
        <Wand />
      </Button>
    </main>
  )
}
