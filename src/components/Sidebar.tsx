import { TwitterIcon } from "../icons/TwitterIcon";
import { SidebarItem } from "./SidebarItems";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "../icons/Logo";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="h-screen bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 w-72 fixed left-0 top-0 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex text-2xl font-bold items-center">
                    <div className="pr-2 text-purple-600">
                        <Logo />
                    </div>
                    <span className="bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
                        Brainly
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Your Digital Brain</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
                <div className="space-y-2">
                    <SidebarItem text="All Content" icon={<span>📁</span>} />
                    <SidebarItem text="Twitter" icon={<TwitterIcon />} />
                    <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
                    <SidebarItem text="Documents" icon={<span>📄</span>} />
                    <SidebarItem text="Links" icon={<span>🔗</span>} />
                    <SidebarItem text="Notes" icon={<span>📝</span>} />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="space-y-2">
                        <SidebarItem text="Favorites" icon={<span>⭐</span>} />
                        <SidebarItem text="Recently Added" icon={<span>🕒</span>} />
                        <SidebarItem text="Tags" icon={<span>🏷️</span>} />
                    </div>
                </div>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            U
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">User</p>
                            <p className="text-xs text-gray-500">Free Plan</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        title="Logout"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}