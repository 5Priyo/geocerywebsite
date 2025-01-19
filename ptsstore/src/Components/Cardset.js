import React from "react";
import "../CSS/Card.css"; // Import the CSS file

const Cards = () => {
  const cardData = [
    {
      image: "./clean.png",
      title: "Spring cleaning for home appliance",
      description: "Get your clean on supplies.",
      bgColor: "#fff7e6",
    },
    {
      image: "./pet.png",
      title: "Your pet choice for fresh healthy food",
      description: "Get your clean on supplies.",
      bgColor: "#e6f7e6",
    },
    {
      image: "./wash.png",
      title: "Washing item with discount product",
      description: "Get your clean on supplies.",
      bgColor: "#e6f1ff",
    },
    {
      image: "./meat.png",
      title: "Fresh quality meat item with discount",
      description: "Get your clean on supplies.",
      bgColor: "#ffe6e6",
    },
  ];

  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div
          className="card"
          key={index}
          style={{ backgroundColor: card.bgColor }}
        >
          <img src={card.image} alt={card.title} className="card-image" />
          <div className="card-content">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
