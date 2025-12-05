import React, { useState } from 'react';
import './Header.css'; 

const Header = () => {
  const [activeTab, setActiveTab] = useState('홈');
  const menuItems = ['홈', '리포트'];

  return (
    <header className="navbar">
      {/* 로고 */}
      <div className="navbar-logo">Salus</div>

      {/* 메뉴 */}
      <nav>
        <ul className="navbar-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* 아이콘 */}
      <div className="navbar-icons">
        <IconButton type="bell" />
        <IconButton type="user" />
      </div>
    </header>
  );
};

const IconButton = ({ type }) => {
  return (
    <button className="icon-btn">
      {type === 'bell' ? (
        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )}
    </button>
  );
};

export default Header;