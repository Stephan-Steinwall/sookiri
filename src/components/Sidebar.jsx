// components/Sidebar.jsx
import React from 'react';
import { 
  LayoutDashboard, 
  FilmIcon,
  PlayCircle,
  Edit3, 
  Users, 
  LogOut,
  Settings,
  Calendar,
  Clock,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import SidebarItem from './SidebarItem';

const Sidebar = ({ activeRoute, onNavigate }) => {
  const mainNavItems = [
    { icon: LayoutDashboard, text: 'DASHBOARD', id: 'dashboard' },
    { icon: FilmIcon, text: 'ADD MOVIE', id: 'add-movie' },
    { icon: PlayCircle, text: 'AVAILABLE', id: 'available' },
    { icon: Edit3, text: 'EDIT SCREEN', id: 'edit-screen' },
    { icon: Users, text: 'CUSTOMERS', id: 'customers' },
    { icon: Calendar, text: 'SCHEDULES', id: 'schedules' },
    { icon: Clock, text: 'SHOW TIMES', id: 'show-times' }
  ];

  const secondaryNavItems = [
    { icon: MessageSquare, text: 'MESSAGES', id: 'messages' },
    { icon: Settings, text: 'SETTINGS', id: 'settings' },
    { icon: HelpCircle, text: 'HELP & SUPPORT', id: 'help' }
  ];

  return (
    <div className="w-72 bg-[#111111] p-6 flex flex-col min-h-screen">
      <div className="mb-8">
        <h1 className="text-yellow-400 text-3xl font-bold tracking-wider">BOOKWAY</h1>
      </div>
      
      <div className="space-y-2 mb-8">
        {mainNavItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            text={item.text}
            active={activeRoute === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>

      <div className="border-t border-gray-800 my-4"></div>

      <div className="space-y-2">
        {secondaryNavItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            text={item.text}
            active={activeRoute === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>

      <div className="mt-auto pt-6">
        <button className="flex items-center px-4 py-3 text-white hover:text-yellow-400 transition-colors w-full">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">SIGN OUT</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;