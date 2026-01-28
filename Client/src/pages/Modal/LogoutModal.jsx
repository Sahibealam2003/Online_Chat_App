const LogoutModal = ({ isOpen, onClose, logout }) => {
  if (!isOpen) return null;

  const handleYes = () => {
    console.log("ok");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-3">
          Logout Confirmation
        </h2>

        <p className="text-sm text-base-content/60 mb-6">
          Do you really want to logout?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn btn-sm btn-ghost"
          >
            No
          </button>

          <button
            onClick={logout}
            className="btn btn-sm btn-error"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
