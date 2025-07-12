const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About This Project</h1>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>React 19</strong> - Latest version with modern features
            </li>
            <li>
              <strong>React Router v7</strong> - Modern routing with createBrowserRouter
            </li>
            <li>
              <strong>TypeScript</strong> - Type safety and better developer experience
            </li>
            <li>
              <strong>Vite</strong> - Fast build tool and dev server
            </li>
            <li>
              <strong>Tailwind CSS v4</strong> - Utility-first CSS framework
            </li>
            <li>
              <strong>Radix UI</strong> - Headless UI components
            </li>
            <li>
              <strong>ESLint + Prettier</strong> - Code linting and formatting
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Auto-format on save with Prettier</li>
            <li>ESLint integration with conflict resolution</li>
            <li>TypeScript type checking</li>
            <li>Modern React Router v7 setup</li>
            <li>Responsive design with Tailwind CSS</li>
            <li>Component library with Radix UI</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
