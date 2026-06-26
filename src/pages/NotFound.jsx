import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-brand">404</p>
        <h1 className="text-xl font-semibold text-navy mt-4">Page not found</h1>
        <p className="text-navy/60 mt-2 text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link to="/login">
            <Button>Owner login</Button>
          </Link>
          <Link to="/admin/login">
            <Button variant="secondary">Admin login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
