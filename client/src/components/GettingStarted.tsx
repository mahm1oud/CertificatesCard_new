const GettingStarted = () => {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-elevation-1 p-6">
      <h2 className="text-2xl font-medium text-neutral-900 mb-4">Getting Started</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-neutral-800">Project Structure</h3>
          <div className="mt-2 p-4 bg-neutral-50 rounded-md font-mono text-sm text-neutral-800 overflow-x-auto">
            <pre>
{`src/
├── components/    # Reusable UI components
├── pages/         # Page components for routing
├── hooks/         # Custom React hooks
├── context/       # React context providers
├── services/      # API and other services
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── assets/        # Static assets
├── App.tsx        # Main App component
└── index.tsx      # Entry point`}
            </pre>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-neutral-800">Installation</h3>
          <div className="mt-2 p-4 bg-neutral-50 rounded-md font-mono text-sm text-neutral-800 overflow-x-auto">
            <code>npm install</code>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-neutral-800">Development</h3>
          <div className="mt-2 p-4 bg-neutral-50 rounded-md font-mono text-sm text-neutral-800 overflow-x-auto">
            <code>npm run dev</code>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-neutral-800">Build</h3>
          <div className="mt-2 p-4 bg-neutral-50 rounded-md font-mono text-sm text-neutral-800 overflow-x-auto">
            <code>npm run build</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
