import { useState } from "react";
import { Camera, ChevronDown, Mail, User } from "lucide-react";
import { useAuth } from "../Utils/useAuth";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    removeProfile,
    isRemovingProfile,
  } = useAuth();

  const [selectedImg, setSelectedImg] = useState(null);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const nav = useNavigate();
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = reader.result;
      await updateProfile({ profilePicture: base64 });
    };
  };

  const removeProfilePicture = async () => {
    try {
      setSelectedImg(null);
      await removeProfile();
    } catch (error) {}
  };

  return (
    <div className="h-screen pt-20 bg-base-200">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-2xl p-6 space-y-8 shadow-lg">
          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-wide">
              Hi @{authUser?.username}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Your profile information
            </p>
          </div>

          {/* AVATAR SECTION */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePicture || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-200 shadow-md"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary text-white
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  hover:scale-105 hover:shadow-lg
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
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
          </div>

          {/* EDIT BUTTON */}
          <div className="space-y-6 ">
            <div
              
              className="text-center  cursor-pointer relative py-3"
            >
              <button
              onClick={() => setShowEditModal(true)}
                className="absolute right-0 top-0 px-4 py-1.5 text-xs font-medium 
                bg-base-200 border border-base-100 rounded-lg 
                hover:bg-base-100 transition cursor-pointer"
              >
                Edit Profile
              </button>
            </div>

            {/* PROFILE INFO */}
            <div className="mt-3">
              <div
                onClick={() => setShowProfileInfo(!showProfileInfo)}
                className="flex items-center justify-between cursor-pointer py-2"
              >
                <h2 className="text-lg font-medium tracking-wide">
                  Profile Information
                </h2>

                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                    showProfileInfo ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </div>

              {/* SMOOTH CONTENT */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  showProfileInfo
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-4 text-sm">
                  {/* FULL NAME */}
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700/60">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <User className="w-4 h-4" />
                      Full Name
                    </div>
                    <span className="font-medium">{authUser?.fullName}</span>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700/60">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </div>
                    <span>{authUser?.email}</span>
                  </div>

                  {/* DOB */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Mail className="w-4 h-4" />
                      Date of Birth
                    </div>
                    <span>{authUser?.dob?.split("T")[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
                <div className="border-b border-zinc-700/60"></div>
          {/* ACCOUNT INFO */}
          <div className="mt-3 ">
            <div
              onClick={() => setShowAccountInfo(!showAccountInfo)}
              className="flex items-center justify-between cursor-pointer py-2"
            >
              <h2 className="text-lg font-medium tracking-wide">
                Account Information
              </h2>

              <ChevronDown
                className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                  showAccountInfo ? "-rotate-90" : "rotate-0"
                }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showAccountInfo
                  ? "max-h-40 opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700/60">
                  <span className="text-zinc-400">Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-400">Account Status</span>
                  <span className="text-green-500 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        selectedImg={selectedImg}
        handleImageUpload={handleImageUpload}
        removeProfilePicture={removeProfilePicture}

      />
    </div>
  );
};

export default ProfilePage;
