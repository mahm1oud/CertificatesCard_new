import FeatureCard from "../components/FeatureCard";
import GettingStarted from "../components/GettingStarted";
import { Feature } from "../types/navigation";

const features: Feature[] = [
  {
    icon: "code",
    title: "TypeScript Integration",
    description: "Leverage the power of TypeScript for type-safe development with proper type checking and intellisense support."
  },
  {
    icon: "layers",
    title: "Component Structure",
    description: "Organize your application with reusable components following React best practices and design patterns."
  },
  {
    icon: "directions",
    title: "Routing System",
    description: "Navigate between pages with a clean routing system implemented with Wouter for a seamless user experience."
  },
  {
    icon: "devices",
    title: "Responsive Design",
    description: "Build interfaces that work beautifully across desktop, tablet, and mobile devices with responsive design principles."
  },
  {
    icon: "data_usage",
    title: "State Management",
    description: "Manage application state efficiently with React's context API, hooks, or external state management libraries."
  },
  {
    icon: "bug_report",
    title: "Error Handling",
    description: "Implement robust error handling with error boundaries, proper logging, and user-friendly error messages."
  }
];

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-neutral-900">React TypeScript Application</h1>
        <p className="text-neutral-600 mt-2">Welcome to your new React TypeScript application!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
      
      <GettingStarted />
    </div>
  );
};

export default Home;
