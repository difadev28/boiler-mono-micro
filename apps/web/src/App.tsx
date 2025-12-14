import { useState } from 'react'
import { Button, Card, Input } from '@monorepo/ui'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Web App - Monorepo Demo
        </h1>

        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Counter Component</h2>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setCount(count - 1)}
              variant="secondary"
            >
              Decrease
            </Button>
            <span className="text-xl font-medium">{count}</span>
            <Button
              onClick={() => setCount(count + 1)}
            >
              Increase
            </Button>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Form Example</h2>
          <div className="space-y-4">
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              onClick={() => alert(`Hello, ${name || 'World'}!`)}
              variant="primary"
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App