import React from 'react';
import { Book, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-container">
              <Book className="brand-icon" />
              <span className="brand-text-f">汉语学习</span>
            </div>
            <p className="brand-subtext">
              Платформа для изучения китайского языка
            </p>
          </div>
          
          <div className="footer-links">
            <div className="links-section">
              <h3>Быстрые ссылки</h3>
              <ul className="links-list">
                <li className="link-item"><a href="/">Главная</a></li>
                <li className="link-item"><a href="/dictionary">Словарь</a></li>
                <li className="link-item"><a href="/tests">Тесты</a></li>
                <li className="link-item"><a href="/texts">Тексты</a></li>
                <li className="link-item"><a href="/exercises">Упражнения</a></li>
              </ul>
            </div>
            
            <div className="links-section">
              <h3>Ссылка на репозиторий</h3>
              <div className="contact-section">
                <Mail className="contact-icon" />
                <span>github.com/Katapo13/Learnind-Chinese</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} 汉语学习. Все права защищены (но это не точно).
        </div>
      </div>
    </footer>
  );
};

export default Footer;

