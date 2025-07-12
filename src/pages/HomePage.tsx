import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome to React Router v7</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          This is a modern React application using React Router v7 with TypeScript, Vite, Tailwind CSS, and
          authentication with React Query + Redux Toolkit.
        </p>
        <Button size="lg">Get Started</Button>
      </div>
    </div>
  );
};

export default HomePage;
