import { Link } from 'react-router-dom';
import { FaClinicMedical, FaFileAlt } from 'react-icons/fa';
 
export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className={`sticky top-0 z-10 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaClinicMedical className="text-blue-500 text-2xl" />
          <span className="text-xl font-bold">USCOM Monitor</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 hover:text-blue-500">
            <FaClinicMedical />
            <span>Dashboard</span>
          </Link>
         
          <Link to="/docs" className="flex items-center space-x-1 hover:text-blue-500">
            <FaFileAlt />
            <span>Documentation</span>
          </Link>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}