import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/CreateCard.css";

export default function CreateCard(props) {
  const [form, setForm] = useState({
    bride: "",
    groom: "",
    date: "",
    time: "",
    venue: "",
    theme: "1",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmitEntry(e) {
    e.preventDefault();

    const newEntry = { ...form };

    setForm({
      bride: "",
      groom: "",
      date: "",
      time: "",
      venue: "",
      theme: "1",
    });

    // window.location.reload();

    const newc = {
      userid: props.userid,
      cardid: Math.floor(Math.random() * 10000),
      ...newEntry,
    };

    props.addCard(newc);

    await fetch("/addcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newc),
    }).catch((error) => {
      console.log(error);
      return;
    });
  }

  return (
    <div className="container">
      <form className="new shadow-lg" onSubmit={onSubmitEntry}>
        <div className="row">
          <div className="col-sm-12 col-lg-5">
            <label htmlFor="bride">Bride Name</label>
            <input
              required
              type="text"
              className="form-control"
              id="bride"
              value={form.bride}
              onChange={(e) => {
                updateForm({ bride: e.target.value });
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2"> </div>

          <div className="col-sm-12 col-lg-5">
            <label htmlFor="groom">Bridegroom Name</label>
            <input
              required
              type="text"
              className="form-control"
              id="groom"
              value={form.groom}
              onChange={(e) => {
                updateForm({ groom: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="date">Date</label>
            <input
              required
              type="text"
              className="form-control"
              id="date"
              value={form.date}
              onChange={(e) => {
                updateForm({ date: e.target.value });
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="time">Time</label>
            <input
              required
              type="text"
              className="form-control"
              id="time"
              value={form.time}
              onChange={(e) => {
                updateForm({ time: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label htmlFor="venue">Venue</label>
            <input
              required
              type="text"
              className="form-control"
              id="venue"
              value={form.venue}
              onChange={(e) => {
                updateForm({ venue: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label htmlFor="venue">Wedding Card Theme</label>
            <select
              required
              name="theme"
              id="theme"
              value={form.theme}
              className="form-select form-control"
              aria-label="select status"
              onChange={(e) => {
                updateForm({ theme: e.target.value });
              }}
            >
              <option value="1">Florals</option>
              <option value="2">Conffetti</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12 col-lg-4">
            <button type="submit" className="todo-button">
              GENERATE CARD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

CreateCard.proptype = {
  userid: PropTypes.number,
};
