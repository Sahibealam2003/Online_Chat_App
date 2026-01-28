import { Camera, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../Utils/useAuth";


const EditProfileModal = ({
  isOpen,
  onClose,
  isLoading,
  selectedImg,
  handleImageUpload,
  removeProfilePicture,
}) => {
  const { isUpdatingProfile, authUser, isRemovingProfile, updateUserInfo } = useAuth();
  const [fullName, setFullName] = useState(authUser?.fullName || "");
 

  // Update local state when authUser changes
  useEffect(() => {
    setFullName(authUser?.fullName || "");
  }, [authUser]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullName.trim() === "") return;
    await updateUserInfo({ fullName }); // username untouched
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md bg-base-300 rounded-xl p-6 shadow-xl animate-in fade-in zoom-in">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-zinc-400 transition transform hover:scale-105 hover:font-bold cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AVATAR SECTION */}
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePicture || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 border-base-200 shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 
                bg-primary text-white p-2 rounded-full cursor-pointer 
                transition-all duration-200 hover:scale-105 hover:shadow-lg
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
            >
              <Camera className="w-5 h-5" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-xs text-zinc-400">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>

          {authUser.profilePicture && (
            <button
              className="text-xs text-red-400 hover:underline cursor-pointer"
              onClick={removeProfilePicture}
              disabled={isUpdatingProfile || isRemovingProfile}
            >
              Remove Profile Picture
            </button>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="text-xs text-zinc-400">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-base-200 border border-base-100 focus:outline-none"
            />
          </div>

          {/* USERNAME (readonly) */}
          <div>
            <label className="text-xs text-zinc-400">Username (cannot change)</label>
            <input
              type="text"
              value={authUser?.username || ""}
              readOnly
              className="w-full mt-1 px-3 py-2 rounded-lg bg-base-200 border border-base-100 text-zinc-400 cursor-not-allowed"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg bg-base-200 hover:bg-base-100 cursor-pointer duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading || isUpdatingProfile}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-content hover:opacity-90 cursor-pointer   duration-200"
            >
              {isLoading || isUpdatingProfile ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
