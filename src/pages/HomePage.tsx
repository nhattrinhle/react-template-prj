import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to React Router v7</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        This is a modern React application using React Router v7 with TypeScript, Vite, Tailwind CSS, and
        Prettier/ESLint configuration.
      </p>
      <Button size="lg">Get Started</Button>
    </div>
  );
};

export default HomePage;
