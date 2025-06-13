import React from 'react';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <nav>
      <h1>{title}</h1>
    </nav>
  );
};

export default Navbar;
