import React from "react";

const Navigation = ({ items, activeItem, onSelect }) => (
  <nav className="nav">
    {items.map((item) => (
      <button
        key={item}
        type="button"
        className={item === activeItem ? "nav-item active" : "nav-item"}
        onClick={() => onSelect(item)}
      >
        {item}
      </button>
    ))}
  </nav>
);

export default Navigation;
