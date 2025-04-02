import React from "react";

function About() {
  const contributors = [{ name: "Jonathan Sanfilippo", role: "Developer" }];

  return (
    <div className="about">
      <h2>About This Pokédex</h2>
      <p>
        This Pokédex project allows you to explore different Pokémon, view their
        details, and learn more about them!
      </p>
      <p>
        The data used in this application is fetched from the official Pokémon
        API.
      </p>
      <p>
        This project is built using React, a popular JavaScript library for
        building user interfaces.
      </p>
      <h3>Contributors</h3>
      <ul>
        {contributors.map((contributor) => (
          <li key={contributor.name}>
            {contributor.name} ({contributor.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
