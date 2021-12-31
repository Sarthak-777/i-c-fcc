import { useEffect } from "react";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

function dashboard() {
  useEffect(() => {
    document.title = "Instagram";
  });
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}

export default dashboard;
