import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} Learn Chinese. Все права защищены (но это не точно).</p>
      </div>
    </footer>
  );
};

export default Footer;

