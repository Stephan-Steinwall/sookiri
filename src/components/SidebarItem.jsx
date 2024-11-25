// components/SidebarItem.jsx
import React from 'react';

const SidebarItem = ({ icon: Icon, text, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center px-4 py-3 cursor-pointer transition-colors rounded-lg
      ${active ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-800'}`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-medium">{text}</span>
  </div>
);

export default SidebarItem;