import { useState } from 'react'
import { Button, Card, Input } from '@monorepo/ui'

function App() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask])
      setNewTask('')
    }
  }

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Mobile App - Todo List
        </h1>

        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter a task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={addTask}
              variant="primary"
              className="px-6"
            >
              Add
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">
            Tasks ({tasks.length})
          </h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="flex-1">{task}</span>
                  <Button
                    onClick={() => removeTask(index)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}

export default App