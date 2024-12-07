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
							<UserCircle className="w-5 h-5 lg:h-8 lg:w-8 text-indigo-600" />
							<span className="text-sm md:text-base lg:text-xl font-bold text-gray-900">
								Profile Manager
							</span>
						</a>
					</div>

					<div className="flex items-center p-2">
						{profile && (
							<div className="text-gray-700 flex  gap-2 items-center">
								<span>Welcome,</span>
								<span className="text-purple-400 capitalize">
									{profile.firstName} {profile.lastName}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
