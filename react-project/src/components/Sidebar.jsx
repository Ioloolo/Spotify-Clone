import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiChartBar,
  HiOutlineHome,
  HiOutlineMenu,
} from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';

const NavLinks = () => (
  <div className="mt-10">
    <div className="flex flex-col">
      <div className="flex flex-row justify-start items-center mb-6 text-sm font-medium text-gray-400">
        <HiOutlineHome className="w-6 h-6 mr-2" />
        <Link to="/">
          <p className="font-semibold text-white">
            탐색
          </p>
        </Link>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[280px] py-10 p-4 bg-[#191624]">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: 150, margin: '0 auto' }} className="w-full h-14 object-contain" />
        </Link>
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3 z-50">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2 z-50"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-1/2 bg-gradient-to-tl from-white/5 to-[#141440] backdrop-blur-lg z-50 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : 'left-[100%]'
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
