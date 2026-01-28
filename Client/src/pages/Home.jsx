import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../Utils/useAuth";
import { useChat } from "../Utils/useChat";


const Home = () => {

  const { selectedUser } = useChat();

  


  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-18 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;