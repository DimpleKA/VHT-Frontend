import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="Navbar bg-gradient-to-b from-custom-pinkDownGr to-custom-blueTopGr py-4">
      {/* Laptop-smartphone layout */}
      <div className="Laptop-smartphone flex justify-between items-center px-6">
        {/* Left section with brand */}
        <div className="left flex items-center space-x-3">
          <LocalLibraryIcon sx={{ fontSize: 40, color: 'white' }} />
          <div className="brandname text-3xl text-white font-bold">VHT</div>
        </div>

        {/* Right section with links and buttons */}
        <div className="right sm:hidden lg:flex flex items-center space-x-8">
          {/* Navbar links */}
          <div className="links flex space-x-6 text-lg text-white">
            <Link to="/" className="hover:text-custom-orange transition duration-300 ease-in-out">Home</Link>
            <Link to="/courses" className="hover:text-custom-orange transition duration-300 ease-in-out">Courses</Link>
            <Link to="/about" className="hover:text-custom-orange transition duration-300 ease-in-out">About</Link>
            <Link to="/blog" className="hover:text-custom-orange transition duration-300 ease-in-out">Blog</Link>
            <Link to="/contact" className="hover:text-custom-orange transition duration-300 ease-in-out">Contact</Link>
          </div>

          {/* Join and Login buttons */}
          <div className="login-join flex space-x-4">
            <div className="join px-4 py-2 rounded-lg bg-custom-lightpink text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
              Join
            </div>
            <div className="Login px-4 py-2 rounded-lg bg-custom-orange text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
              Login
            </div>
          </div>
        </div>

        {/* Smartphone Menu Toggle (visible on mobile) */}
        <div className="smartphoneDisplayOny lg:hidden " onClick={toggleMenu}>
          {isMenuOpen ? (
            <CloseIcon sx={{ fontSize: 30, color: 'white' }} />
          ) : (
            <MenuIcon sx={{ fontSize: 30, color: 'white' }} />
          )}
        </div>
      </div>

      {/* Mobile Menu (when menu is open) */}
      <div className={`smartphone ${isMenuOpen ? 'block' : 'hidden'}  bg-custom-orange text-white py-6 px-6 transition-all duration-300 ease-in-out`}>
        {/* Mobile Links */}
        <div className="links flex flex-col space-y-4 text-lg">
          <Link to="/" className="hover:text-custom-lightpink transition duration-300 ease-in-out">Home</Link>
          <Link to="/courses" className="hover:text-custom-lightpink transition duration-300 ease-in-out">Courses</Link>
          <Link to="/about" className="hover:text-custom-lightpink transition duration-300 ease-in-out">About</Link>
          <Link to="/blog" className="hover:text-custom-lightpink transition duration-300 ease-in-out">Blog</Link>
          <Link to="/contact" className="hover:text-custom-lightpink transition duration-300 ease-in-out">Contact</Link>
        </div>

        {/* Mobile Join and Login Buttons */}
        <div className="login-join mt-6 flex flex-col space-y-4">
          <div className="join px-4 py-2 rounded-lg bg-custom-lightpink text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
            Join
          </div>
          <div className="Login px-4 py-2 rounded-lg bg-custom-orange text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
