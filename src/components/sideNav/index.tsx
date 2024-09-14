import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface SideNavItem {
  label: string;
  path: string;
}

interface SideNavProps {
  items: SideNavItem[];
}

function SideNav({ items }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Container */}
      <div className={`fixed top-0 left-0 h-screen ${isOpen ? 'w-64' : 'bg-transparent'} bg-gray-800 p-4 transition-all duration-1000 ease-in-out overflow-hidden`}>
        {/* Sidebar Content */}
        {isOpen && (
          <div className="relative h-full">
            {/* Close Button */}
            <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white z-20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-white text-lg font-bold mb-4 mt-8 transition-all duration-1000 ease-in-out">Charles</h2>
            <div className="mt-8">
              {items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-white block mb-4 px-4 py-2 rounded ${isActive ? 'bg-gray-900' : 'hover:bg-gray-700'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hamburger Button */}
      {!isOpen && (
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-30 bg-transparent text-white p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </>
  );
}

export default SideNav;
