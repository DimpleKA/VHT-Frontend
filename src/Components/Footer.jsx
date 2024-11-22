import React from 'react';
import { Link } from 'react-router-dom';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div className="Footer bg-custom-darkBlue text-white py-16 px-6">
      {/* Top section with the grid layout */}
      <div className="top grid grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-12">
        {/* First Column (Brand, Description, Icons) */}
        <div className="first flex flex-col space-y-6">
          {/* Brand Name */}
          <div className="flex items-center space-x-4 text-5xl font-bold transform transition-transform duration-300 ease-in-out hover:scale-105">
            <LocalLibraryIcon sx={{ fontSize: 40, color: 'lightpink' }} />
            <span className="text-6xl text-custom-lightpink">VHT</span>
          </div>
          {/* Description */}
          <p className="text-lg opacity-80">
            The automated process starts as soon as your clothes go into the machine.
          </p>
          {/* Social Media Icons with 3D Effect */}
          <div className="icons flex space-x-6 text-3xl">
            <div className="transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer bg-custom-lightpink p-4 rounded-full shadow-lg hover:shadow-xl">
              <InstagramIcon sx={{ fontSize: 30 }} />
            </div>
            <div className="transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer bg-custom-lightpink p-4 rounded-full shadow-lg hover:shadow-xl">
              <TwitterIcon sx={{ fontSize: 30 }} />
            </div>
            <div className="transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer bg-custom-lightpink p-4 rounded-full shadow-lg hover:shadow-xl">
              <LinkedInIcon sx={{ fontSize: 30 }} />
            </div>
          </div>
        </div>

        {/* Second Column (Our Solutions List) */}
        <div className="second flex flex-col space-y-6">
          <div className="heading text-2xl font-semibold transform transition-transform duration-300 ease-in-out hover:scale-105">
            Our Solutions
          </div>
          <div className="urlList space-y-4 text-lg">
            <Link to="/design-creatives" className="block hover:text-custom-lightpink transition duration-200">Design & Creatives</Link>
            <Link to="/telecommunication" className="block hover:text-custom-lightpink transition duration-200">Telecommunication</Link>
            <Link to="/restaurant" className="block hover:text-custom-lightpink transition duration-200">Restaurant</Link>
            <Link to="/programming" className="block hover:text-custom-lightpink transition duration-200">Programming</Link>
            <Link to="/architecture" className="block hover:text-custom-lightpink transition duration-200">Architecture</Link>
          </div>
        </div>

        {/* Third Column (Our Solutions List) */}
        <div className="third flex flex-col space-y-6">
          <div className="heading text-2xl font-semibold transform transition-transform duration-300 ease-in-out hover:scale-105">
            Our Solutions
          </div>
          <div className="urlList space-y-4 text-lg">
            <Link to="/design-creatives" className="block hover:text-custom-lightpink transition duration-200">Design & Creatives</Link>
            <Link to="/telecommunication" className="block hover:text-custom-lightpink transition duration-200">Telecommunication</Link>
            <Link to="/restaurant" className="block hover:text-custom-lightpink transition duration-200">Restaurant</Link>
            <Link to="/programming" className="block hover:text-custom-lightpink transition duration-200">Programming</Link>
            <Link to="/architecture" className="block hover:text-custom-lightpink transition duration-200">Architecture</Link>
          </div>
        </div>

        {/* Fourth Column (Our Solutions List) */}
        <div className="fourth flex flex-col space-y-6">
          <div className="heading text-2xl font-semibold transform transition-transform duration-300 ease-in-out hover:scale-105">
            Our Solutions
          </div>
          <div className="urlList space-y-4 text-lg">
            <Link to="/design-creatives" className="block hover:text-custom-lightpink transition duration-200">Design & Creatives</Link>
            <Link to="/telecommunication" className="block hover:text-custom-lightpink transition duration-200">Telecommunication</Link>
            <Link to="/restaurant" className="block hover:text-custom-lightpink transition duration-200">Restaurant</Link>
            <Link to="/programming" className="block hover:text-custom-lightpink transition duration-200">Programming</Link>
            <Link to="/architecture" className="block hover:text-custom-lightpink transition duration-200">Architecture</Link>
          </div>
        </div>
      </div>

      {/* Bottom section (Copyright) */}
      <div className="bottom mt-12">
        <div className="copyright text-center text-lg font-medium opacity-75">
          Copyright © {new Date().getFullYear()} All rights reserved | VHT An{' '}
          <LocalLibraryIcon sx={{ color: 'lightpink', fontSize: 18 }} />
          Education Website
        </div>
      </div>
    </div>
  );
}

export default Footer;
