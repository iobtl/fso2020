import React from 'react';

type HeaderProps = {
  name: string;
};

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <h1>{name}</h1>;
};

export default Header;
