import MainSec from "./components/mainSec.jsx";
import Sidebar from "./components/sidebar.jsx";
export default function App() {
  return (
    <>
      <div className="flex h-screen">
        {/* <!-- Sidebar --> */}
        <Sidebar />

        {/* <!-- Main Content --> */}
        <MainSec />
      </div>
    </>
  );
}
