import { Feature } from "../types/navigation";
import { Link } from "wouter";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden hover:shadow-elevation-2 transition-all">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="material-icons text-primary">{feature.icon}</span>
          <h2 className="text-xl font-medium text-neutral-900">{feature.title}</h2>
        </div>
        <p className="text-neutral-600">{feature.description}</p>
        <div className="mt-4">
          <Link href="#" className="inline-flex items-center text-primary hover:text-primary-dark transition-all">
            <span>Learn more</span>
            <span className="material-icons text-sm ml-1">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
