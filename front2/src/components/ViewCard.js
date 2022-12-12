import React from "react";
import PropTypes from "prop-types";
import "../styles/ViewCard.css";

export default function ViewCard(props) {
  function getBg(theme) {
    if (theme === "1") {
      return "../img/flower.jpg";
    } else if (theme === "2") {
      return "../img/conf.png";
    } else if (theme === "3") {
      return "../img/lights.png";
    } else if (theme === "4") {
      return "../img/heart.png";
    } else if (theme === "5") {
      return "../img/crackers.jpeg";
    }
  }
  return (
    <div className="container text-center mt-5">
      {props.card.cardid ? (
        <div
          className="card shadow-lg"
          style={{
            backgroundImage: `url('${getBg(props.card.theme)}')`,
          }}
        >
          <p className="invite">
            You are <br></br> invited to the <br></br> wedding of
          </p>
          <p className="ppl">{props.card.bride}</p>
          <p>+</p>
          <p className="ppl">{props.card.groom}</p>
          <p className="ppl mt-5">
            {props.card.date} &#x2022; {props.card.time}
          </p>
          <p className="ppl mt-2">{props.card.venue}</p>
        </div>
      ) : (
        <p>Select a card to view</p>
      )}
    </div>
  );
}

ViewCard.proptype = {
  card: PropTypes.object,
};
