import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="text-center max-w-md">
        <p className="text-5xl font-semibold text-navy font-mono tracking-tight">404</p>
        <h1 className="text-lg font-semibold text-navy mt-4">Page not found</h1>
        <p className="text-navy/55 mt-2 text-sm">
          This route does not exist or has moved.
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
