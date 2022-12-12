import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CreateCard from "../components/CreateCard";
import DisplayCards from "../components/DisplayCards";

export default function Card() {
  const userid = 1;
  const [cards, setCards] = useState([]);

  async function reloadData() {
    let data;
    try {
      const res = await fetch(`/getUserCards/${userid}`);
      data = await res.json();
    } catch (e) {
      console.log(e);
    }

    if (data && data.length !== 0) {
      data && setCards(data.cards);
    }
  }

  const deleteCard = async (cardid) => {
    const removedArr = [...cards].filter((c) => c.cardid !== cardid);
    setCards(removedArr);
  };

  const addCard = async (card) => {
    const newCards = [...cards, card];
    setCards(newCards);
  };

  useEffect(() => {
    reloadData();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="row mt-3">
          <h1>Create Quick and Easy Wedding Cards</h1>
          <CreateCard userid={userid} addCard={addCard}></CreateCard>
        </div>
        <div className="row mt-5">
          <h1>View all your created cards here</h1>
          <DisplayCards
            cards={cards}
            userid={userid}
            deleteCard={deleteCard}
          ></DisplayCards>
        </div>
      </div>
    </React.Fragment>
  );
}

Card.proptype = {};
