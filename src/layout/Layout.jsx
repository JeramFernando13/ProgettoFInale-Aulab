import { Outlet } from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function Layout() {
    return (
        <>
            <Toaster position='top-center'reverseOrder={true} />
            <div className = "flex min-h-full ">
                <aside className="min-h-full ">
                    <Sidebar />
                </aside>

                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};