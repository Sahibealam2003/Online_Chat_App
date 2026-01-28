import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Cake,
  Camera,
  ChevronDown,
  LogOut,
  Mail,
  User,
} from "lucide-react";
import { useAuth } from "../Utils/useAuth";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./Modal/EditProfileModal";
import LogoutModal from "./Modal/LogoutModal";
import DeleteAccountModal from "./Modal/DeleteAccountModal";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    removeProfile,
    logout,
    removeUser,
    isDeleteingUser,
  } = useAuth();

  const [selectedImg, setSelectedImg] = useState(null);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

  const handelDeleteAccount = async () => {
    removeUser(authUser);
  };
  return (
    <div className="min-h-screen relative bg-base-200">
      <div className="max-w-xl mx-auto py-8">
        <button
          onClick={() => nav("/")}
          className="fixed left-20 hidden   top-25 sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium 
  bg-base-200 border border-base-100 rounded-lg 
  hover:bg-base-100 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-base-300 mt-10 rounded-2xl p-6 space-y-8 shadow-lg">
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
            <div className="text-center  cursor-pointer relative py-3">
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
                className="flex items-center justify-between cursor-pointer"
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
                      <Cake className="w-4 h-4" />
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
              className="flex items-center justify-between cursor-pointer"
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
                <div className="flex items-center justify-between py-2 border-b border-zinc-700/0">
                  <span className="text-zinc-400">Member Since</span>
                  <span>
                    {authUser?.createdAt
                      ? authUser.createdAt.split("T")[0]
                      : "Loading..."}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-zinc-400">Account Status</span>
                  <span className="text-green-500 font-medium">Active</span>
                </div>

                {/* Delete Account */}
                <div
                  className="flex items-center justify-between pt-2 "
                >
                  <span className="text-red-500 font-semibold">
                    Delte Account
                  </span>
                  <span
                  onClick={() => {
                    setOpenDeleteModal(true);
                  }}
                   className="text-red-500 font-medium cursor-pointer transition transform hover:scale-104 duration-200">
                    <AlertCircle />
                  </span>
                </div>
                <DeleteAccountModal
                    isOpen={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    onDelete={handelDeleteAccount}
                    isDeleteingUser={isDeleteingUser}
                  />
              </div>
            </div>
          </div>

          {/* Logout */}

          <div className="border-b border-zinc-700/60"></div>
          <div className="mt-3 ">
            <button
              className="flex gap-2 items-center cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => setOpen(true)}
            >
              <LogOut className="size-5 text-red-500" />
              <span className="inline">Logout</span>
            </button>
            <LogoutModal
              isOpen={open}
              onClose={() => setOpen(false)}
              logout={logout}
            />
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
