import { ArrowLeft, Send } from "lucide-react";
import { useThemeStore } from "../Utils/useThemeStore";
import { PREVIEW_MESSAGES, THEMES } from "../themes/allthemes";

const Setting = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 pb-10 max-w-6xl relative">
    <button
          onClick={() => nav("/")}
          className="absolute left-0 top-20 flex items-center gap-1 px-3 py-1.5 text-xs font-medium 
  bg-base-200 border border-base-100 rounded-lg 
  hover:bg-base-100 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back To Home
        </button>
      {/* Header */}
      <div className="mb-8 mt-10">
        <h2 className="text-2xl font-semibold">Theme</h2>
        <p className="text-sm text-base-content/70">
          Choose a theme for your chat interface
        </p>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-10">
        {THEMES.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`
              group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200
              ${theme === t ? "bg-base-200 shadow-inner" : "hover:bg-base-200/30"}
            `}
          >
            <div
              className="relative h-10 w-full rounded-md overflow-hidden border border-base-300"
              data-theme={t}
            >
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
            </div>
            <span className="text-[11px] font-medium truncate w-full text-center">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Preview Section */}
      <h3 className="text-xl font-semibold mb-5">Preview</h3>
      <div className="rounded-2xl overflow-hidden shadow-lg border border-base-300 mb-5 pt-5">
        <div className="bg-base-100">
          <div className="max-w-lg mx-auto">

            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-base-300 bg-base-200 flex items-center gap-3 rounded-t-2xl">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                J
              </div>
              <div>
                <h3 className="font-medium text-sm">John Doe</h3>
                <p className="text-xs text-base-content/70">Online</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto bg-base-100">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[75%] rounded-xl p-3 shadow-sm
                      ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                    `}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`
                        text-[10px] mt-1.5
                        ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                      `}
                    >
                      12:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="px-4 py-4 mb-4 border-t border-base-300 bg-base-200 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1 text-sm h-10"
                  placeholder="Type a message..."
                  value="This is a preview"
                  readOnly
                />
                <button className="btn btn-primary h-10 min-h-0 px-3">
                  <Send size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
