import React from "react";

const Header = ({ title, subtitle }) => (
  <header className="header">
    <div>
      <p className="eyebrow">Sales & Inventory Console</p>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
    <div className="header-actions">
      <button className="btn btn-secondary" type="button">
        Export Report
      </button>
      <button className="btn btn-primary" type="button">
        New Transaction
      </button>
    </div>
  </header>
);

export default Header;
