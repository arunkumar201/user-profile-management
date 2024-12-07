import { UserCircle } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

export function Navbar() {
  const { profile } = useProfile();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <UserCircle className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Profile Manager</span>
            </a>
          </div>
          
          <div className="flex items-center">
            {profile && (
              <span className="text-gray-700">
                Welcome, {profile.firstName} {profile.lastName}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
