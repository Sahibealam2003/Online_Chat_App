const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="min-h-screen hidden lg:flex items-center justify-center bg-base-200 p-10">
      <div className="max-w-md text-center">
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-base-content/60 mb-2">{subtitle}</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/50 ${
                i % 1 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default AuthImagePattern;