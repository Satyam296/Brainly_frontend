import { ReactElement, ReactNode } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement | ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}

export function SidebarItem({ text, icon, isActive = false, onClick }: SidebarItemProps) {
    return (
        <div 
            onClick={onClick}
            className={`flex items-center py-3 px-4 mx-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                isActive 
                    ? "bg-purple-100 text-purple-700 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
        >
            <div className={`mr-3 flex-shrink-0 transition-colors duration-200 ${
                isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"
            }`}>
                {icon}
            </div>
            <div className="font-medium text-sm">
                {text}
            </div>
            {isActive && (
                <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full"></div>
            )}
        </div>
    );
}