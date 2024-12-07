import { useNavigate } from 'react-router-dom';
import {  deleteProfile } from '../services/api';
import { toast } from 'react-hot-toast';
import { Pencil, Trash2 } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { useProfile } from '../hooks/useProfile';

function ProfileDisplayComponent() {
  const navigate = useNavigate();
  const {profile,setProfile,loading,setLoading,setError } = useProfile();


  const handleDelete = async () => {
    if (!profile?.email) {
      toast.error("Profile not found");
      return;
    }

    if (window.confirm("Are you sure you want to delete your profile?")) {
      setLoading(true);
      setError(null);
      try {
        await deleteProfile(profile.id);
        setProfile(null);
        localStorage.removeItem("user-email");
        toast.success("Profile deleted successfully");
        navigate("/profile-form");
      } catch (error) {
        console.error("Error deleting profile:",error);
        toast.error("Failed to delete profile");
        setError("Failed to delete profile");
      } finally {
        setLoading(false);
      }
    }
  }
  
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600">No profile found. Please create one.</p>
        <button
          onClick={() => navigate('/profile-form')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile Details</h2>
        <div className="space-x-2">
          <button
            onClick={() => navigate('/profile-form')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="mt-1 text-lg">{profile.firstName} {profile.lastName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1 text-lg">{profile.email}</p>
        </div>
        {profile.age && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Age</h3>
            <p className="mt-1 text-lg">{profile.age}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDisplayComponent;
