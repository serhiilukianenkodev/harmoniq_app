import React from 'react';
import css from './Tabs.module.css';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className={css.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`${css.tab} ${activeTab === tab.value ? css.active : ''}`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
