import React, { Suspense, useState } from 'react';
import { Card } from '@monorepo/ui';
import ErrorBoundary from './components/ErrorBoundary';

// @ts-ignore - Dynamic remote imports
const RemoteButton = React.lazy(() => import('remote_app/Button'));
// @ts-ignore - Dynamic remote imports
const RemoteUserCard = React.lazy(() => import('remote_app/UserCard'));

function App() {
  const [count, setCount] = useState(0);

  // Mock user data for UserCard demo
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Senior Developer',
    bio: 'Passionate about building scalable microfrontend architectures with React and Module Federation.',
  };

  const handleEdit = (user: any) => {
    alert(`Editing user: ${user.name}`);
  };

  const handleDelete = (userId: string) => {
    alert(`Deleting user with ID: ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          🚀 Microfrontend Host Application
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Consuming components from remote microfrontend via Module Federation
        </p>

        {/* Remote Button Demo */}
        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Remote Button Component
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            This button is loaded from the <code className="bg-gray-100 px-2 py-1 rounded">remote_app</code> microfrontend
          </p>

          <ErrorBoundary fallback={
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-700">Remote Button is currently unavailable</p>
            </div>
          }>
            <Suspense fallback={
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading Remote Button...</span>
              </div>
            }>
              <div className="flex items-center space-x-4">
                <RemoteButton
                  label="Click Me!"
                  onClick={() => setCount(count + 1)}
                  variant="primary"
                  size="md"
                />
                <RemoteButton
                  label="Secondary"
                  variant="secondary"
                  size="md"
                />
                <RemoteButton
                  label="Outline"
                  variant="outline"
                  size="md"
                />
                <span className="text-lg font-medium text-gray-700">
                  Clicked: {count} times
                </span>
              </div>
            </Suspense>
          </ErrorBoundary>
        </Card>

        {/* Remote UserCard Demo */}
        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Remote UserCard Component
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            This user card is loaded from the <code className="bg-gray-100 px-2 py-1 rounded">remote_app</code> microfrontend
          </p>

          <ErrorBoundary fallback={
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-700">Remote UserCard is currently unavailable</p>
            </div>
          }>
            <Suspense fallback={
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading Remote UserCard...</span>
              </div>
            }>
              <div className="max-w-md">
                <RemoteUserCard
                  user={mockUser}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showActions={true}
                />
              </div>
            </Suspense>
          </ErrorBoundary>
        </Card>

        {/* Info Card */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            ℹ️ Architecture Info
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Host App:</strong> Running on port 3000</p>
            <p><strong>Remote App:</strong> Running on port 5001</p>
            <p><strong>Technology:</strong> React + Vite + Module Federation</p>
            <p><strong>Features:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Dynamic component loading with React.lazy</li>
              <li>Error boundaries for graceful failure handling</li>
              <li>Suspense for loading states</li>
              <li>Shared React dependencies</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;