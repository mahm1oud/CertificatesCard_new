import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="material-icons">code</span>
              <span className="font-medium">React TS App</span>
            </div>
            <p className="text-sm mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/help" className="text-neutral-300 hover:text-white transition-all">
              <span className="material-icons">help</span>
            </Link>
            <Link href="/docs" className="text-neutral-300 hover:text-white transition-all">
              <span className="material-icons">description</span>
            </Link>
            <Link href="/code" className="text-neutral-300 hover:text-white transition-all">
              <span className="material-icons">code</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
