import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import AddMovie from './pages/AddMovie';
import Available from './pages/Available';

const MovieManagementSystem = () => {
  const [activeRoute, setActiveRoute] = useState('');

  const renderContent = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-movie':
        return <AddMovie />;
      case 'available':
        return <Available />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Select a menu item to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1a1a1a]">
      <Sidebar activeRoute={activeRoute} onNavigate={setActiveRoute} />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
};

export default MovieManagementSystem;