const About = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-elevation-1 p-6">
        <h1 className="text-3xl font-medium text-neutral-900 mb-4">About</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-neutral-800">Our Application</h2>
            <p className="mt-2 text-neutral-600">
              This is a modern React TypeScript application built with best practices in mind. It demonstrates
              how to set up a project with proper TypeScript configuration, component structure, routing,
              responsive design, and more.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-medium text-neutral-800">Technologies Used</h2>
            <ul className="mt-2 list-disc pl-6 text-neutral-600 space-y-2">
              <li>React - A JavaScript library for building user interfaces</li>
              <li>TypeScript - A typed superset of JavaScript that compiles to plain JavaScript</li>
              <li>Wouter - A minimalist routing library for React applications</li>
              <li>Tailwind CSS - A utility-first CSS framework</li>
              <li>Shadcn UI - A collection of reusable components built with Radix UI and Tailwind CSS</li>
              <li>React Query - A data-fetching library for React applications</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-medium text-neutral-800">Key Features</h2>
            <ul className="mt-2 list-disc pl-6 text-neutral-600 space-y-2">
              <li>Type-safe development with TypeScript</li>
              <li>Responsive design that works on all devices</li>
              <li>Clean and maintainable component structure</li>
              <li>Modern routing system for single-page applications</li>
              <li>Efficient state management with React Context and hooks</li>
              <li>Comprehensive error handling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
