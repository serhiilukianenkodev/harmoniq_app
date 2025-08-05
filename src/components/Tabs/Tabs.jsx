import React from 'react';
import css from './Tabs.module.css';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className={css.tabs}>
      {tabs.map(tab => (
        <button key={tab.id}
          
          className={`${css.tab} ${activeTab === tab.id ? css.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
