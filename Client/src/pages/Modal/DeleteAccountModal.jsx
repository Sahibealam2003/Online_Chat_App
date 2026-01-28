const DeleteAccountModal = ({ isOpen, onClose, onDelete, isDeleteingUser }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          ⚠️ Delete Account
        </h2>

        <p className="text-gray-700 mb-4">
          If you choose to delete your account, please be aware that:
        </p>

        <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
          <li>All your chats will be permanently deleted</li>
          <li>All your media (photos, videos, and files) will be removed</li>
          <li>No backup of your data will be available</li>
          <li>This action cannot be undone</li>
        </ul>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border cursor-pointer transition transform hover:scale-104 duration-200"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={isDeleteingUser}
            className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-50 cursor-pointer transition transform hover:scale-104 duration-200"
          >
            {isDeleteingUser ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
