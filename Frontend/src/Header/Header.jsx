import { useState, useEffect } from 'react';
import LogoutBtn  from './LogoutBtn.jsx';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const navItem = [
    { name: "Home", slug: "/", active: isAuthenticated, icon: "🏠" },
    { name: "Login", slug: "/login", active: !isAuthenticated && !loading, icon: "🔐" },
    { name: "Signup", slug: "/signup", active: !isAuthenticated && !loading, icon: "✨" },
    { name: "All Urls", slug: "/all-urls", active: isAuthenticated, icon: "📚" },
  
  ];
  
 
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
   
        <nav className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center group transition-all duration-200 hover:scale-105"
          >
            <div className="relative">
         
              {/* Subtle glow effect on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center">
            <ul className="flex items-center gap-2">
              {navItem.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="relative px-4 py-2 rounded-full text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50 group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                        {item.name}
                      </span>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300 rounded-full"></div>
                    </button>
                  </li>
                ) : null
              )}

              {/* Enhanced Logout Button */}
              {isAuthenticated && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
    
    </header>
  );
}

export default Header;
