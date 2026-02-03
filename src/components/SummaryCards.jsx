import React from "react";

const SummaryCards = ({ stats }) => (
  <section className="summary">
    {stats.map((stat) => (
      <article key={stat.label} className="summary-card">
        <div>
          <p className="summary-label">{stat.label}</p>
          <h3>{stat.value}</h3>
        </div>
        <span className={stat.trend > 0 ? "trend up" : "trend down"}>
          {stat.trend > 0 ? "+" : ""}
          {stat.trend}%
        </span>
      </article>
    ))}
  </section>
);

export default SummaryCards;
