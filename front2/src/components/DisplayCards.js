import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ViewCard from "./ViewCard";
import { FaTrash } from "react-icons/fa";
import "../styles/DisplayCards.css";

export default function DisplayCards({ cards }) {
  const [card, setCard] = useState({
    userid: "",
    cardid: "",
    bride: "",
    groom: "",
    date: "",
    time: "",
    venue: "",
    theme: "",
  });
  const [dcard, setdCard] = useState(cards);

  useEffect(() => {
    setdCard(cards);
  }, [cards]);

  async function deletecard(cardid) {
    // window.location.reload(false);
    const removedArr = [...dcard].filter((c) => c.cardid !== cardid);
    setdCard(removedArr);

    await fetch("/deletecard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: cardid }),
    }).catch((error) => {
      console.log(error);
      return;
    });
  }

  return (
    <div className="container">
      <div className="row display">
        {dcard.map((c, idx) => {
          return (
            <div
              onClick={(e) => {
                setCard({
                  userid: c.userid,
                  cardid: c.cardid,
                  bride: c.bride,
                  groom: c.groom,
                  date: c.date,
                  time: c.time,
                  venue: c.venue,
                  theme: c.theme,
                });
              }}
              key={idx}
              className="cardlist"
            >
              {/* <input type="text" readOnly value={c.cardid} hidden></input> */}
              {"Wedding Invite " + (idx + 1)}
              <FaTrash onClick={() => deletecard(c.cardid)} />{" "}
            </div>
          );
        })}
      </div>

      <div className="row">
        <ViewCard card={card}></ViewCard>
      </div>
    </div>
  );
}

DisplayCards.proptype = {
  userid: PropTypes.number,
};
