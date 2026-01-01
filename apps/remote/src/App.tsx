import { useState } from 'react';
import Button from './components/Button';
import UserCard from './components/UserCard';

function App() {
  const [count, setCount] = useState(0);

  // Mock users for demo
  const mockUsers = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'Frontend Developer',
      bio: 'Passionate about creating beautiful user interfaces with React.',
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'Backend Engineer',
      bio: 'Building scalable APIs and microservices.',
    },
  ];

  const handleEdit = (user: any) => {
    alert(`Editing user: ${user.name}`);
  };

  const handleDelete = (userId: string) => {
    alert(`Deleting user with ID: ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          📱 Remote Microfrontend
        </h1>
        <p className="text-center text-gray-600 mb-8">
          This app exposes components via Module Federation
        </p>

        {/* Button Component Demo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Button Component
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Exposed as <code className="bg-gray-100 px-2 py-1 rounded">remote_app/Button</code>
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                label="Click Me!"
                onClick={() => setCount(count + 1)}
                variant="primary"
                size="md"
              />
              <Button
                label="Secondary"
                variant="secondary"
                size="md"
              />
              <Button
                label="Outline"
                variant="outline"
                size="md"
              />
              <span className="text-lg font-medium text-gray-700">
                Count: {count}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button label="Small" size="sm" />
              <Button label="Medium" size="md" />
              <Button label="Large" size="lg" />
            </div>

            <div>
              <Button label="Disabled" disabled />
            </div>
          </div>
        </div>

        {/* UserCard Component Demo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            UserCard Component
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Exposed as <code className="bg-gray-100 px-2 py-1 rounded">remote_app/UserCard</code>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions={true}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            ℹ️ Module Federation Info
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>App Name:</strong> remote_app</p>
            <p><strong>Dev Port:</strong> 3001</p>
            <p><strong>Preview Port:</strong> 5001</p>
            <p><strong>Exposed Components:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><code>./Button</code> - Reusable button with variants</li>
              <li><code>./UserCard</code> - User profile card</li>
            </ul>
            <p className="mt-4"><strong>Entry Point:</strong></p>
            <code className="block bg-gray-100 p-2 rounded text-xs mt-1">
              http://localhost:5001/assets/remoteEntry.js
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;