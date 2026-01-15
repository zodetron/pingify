import React, { useState } from 'react';
import { X, User, Code2, Save, UserIcon, UserRoundIcon } from 'lucide-react';
import TechSelector from './TechSelector';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';

const ProfileModal = ({ isOpen, onClose, user }) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    bio: user?.bio || '',
    nativeLanguage: user?.nativeLanguage || '',
    learningLanguage: user?.learningLanguage || '',
    profilePic: user?.profilePic || '',
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      onClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    },
  });

  const handleMaleAvatar = () => {
    const idx = Math.floor(Math.random() * 50) + 1;
    const randomAvatar = `https://xsgames.co/randomusers/assets/avatars/male/${idx}.jpg`;
    setFormData({ ...formData, profilePic: randomAvatar });
    toast.success('Avatar changed');
  };

  const handleFemaleAvatar = () => {
    const idx = Math.floor(Math.random() * 50) + 1;
    const randomAvatar = `https://xsgames.co/randomusers/assets/avatars/female/${idx}.jpg`;
    setFormData({ ...formData, profilePic: randomAvatar });
    toast.success('Avatar changed');
  };

  const handleArtAvatar = () => {
    const idx = Math.floor(Math.random() * 50) + 1;
    const randomAvatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${idx}.jpg`;
    setFormData({ ...formData, profilePic: randomAvatar });
    toast.success('Avatar changed');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      ...user,
      ...formData,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="card bg-base-200 w-full max-w-2xl shadow-2xl border border-base-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="card-body p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <User className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Edit Profile</h2>
              </div>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4">
                <div className="avatar">
                  <div className="w-24 rounded-full ring-4 ring-primary/20 ring-offset-4 ring-offset-base-200">
                    <img src={formData.profilePic} alt={user?.fullName} />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{user?.fullName}</h3>
                  <p className="text-sm opacity-70">{user?.email}</p>
                </div>

                {/* Avatar Generator Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleMaleAvatar}
                    className="btn btn-sm btn-accent"
                  >
                    <UserIcon className="size-4" />
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={handleArtAvatar}
                    className="btn btn-sm btn-accent"
                  >
                    <UserRoundIcon className="size-4" />
                    Artistic
                  </button>
                  <button
                    type="button"
                    onClick={handleFemaleAvatar}
                    className="btn btn-sm btn-accent"
                  >
                    <UserRoundIcon className="size-4" />
                    Female
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Bio</span>
                  <span className="label-text-alt opacity-70">
                    {formData.bio.length}/200
                  </span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value.slice(0, 200) })
                  }
                  className="textarea textarea-bordered h-24 resize-none"
                  placeholder="Tell others about yourself and your coding journey..."
                />
              </div>

              {/* Tech Stack */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="size-5 text-primary" />
                  <h3 className="font-semibold">Tech Stack</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Favorite Language */}
                  <TechSelector
                    value={formData.nativeLanguage}
                    onChange={(value) =>
                      setFormData({ ...formData, nativeLanguage: value })
                    }
                    label="🏆 Your Strongest Language"
                    placeholder="What are you best at?"
                  />

                  {/* Learning Language */}
                  <TechSelector
                    value={formData.learningLanguage}
                    onChange={(value) =>
                      setFormData({ ...formData, learningLanguage: value })
                    }
                    label="📚 Currently Learning"
                    placeholder="What are you learning?"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost flex-1"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
