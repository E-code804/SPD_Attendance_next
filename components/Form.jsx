"use client";

import { useState } from "react";
import { ClipLoader } from "react-spinners";
import DataList from "./DataList";
import SubmitMessage from "./SubmitMessage";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    excuse: "",
  });
  const [submitStatus, setSubmitStatus] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const disabled = false;

  const handleStatus = (submit, display, msg, load) => {
    setSubmitStatus(submit);
    setDisplayStatus(display);
    setMsg(msg);
    setIsLoading(load);
  };

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    setIsLoading(true);
    const currentDate = new Date().toISOString().split("T")[0];
    const oldDate = localStorage.getItem("date");

    if (disabled) {
      handleStatus(false, true, "Form is disabled.", false);
    } else if (!(currentDate === oldDate)) {
      fetch(`/api/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          handleStatus(false, true, "Couldn't submit.", false);
          throw new Error("Could't submit.");
        }
        setFormData({
          name: "",
          attending: "yes",
          excuse: "",
        });
        handleStatus(true, true, "Success!", false);
        localStorage.setItem("date", currentDate);
      });
    } else {
      handleStatus(false, true, "Naughty boy, you already submitted!", false);
    }
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h2>Attendance Form</h2>

      <label htmlFor="name">
        <strong>Name:</strong>
      </label>
      <input
        type="text"
        list="names"
        id="name"
        name="name"
        required
        placeholder="Ex: Vikas Reddy"
        value={formData.name}
        onChange={handleChange}
      />
      <DataList />

      <div className="radio-group">
        <label>
          <strong>Will you be attending?</strong>
        </label>

        <label htmlFor="yes">
          <input
            type="radio"
            id="yes"
            name="attending"
            value="yes"
            checked={formData.attending === "yes"}
            onChange={handleChange}
            required
          />
          Yes
        </label>

        <label htmlFor="no">
          <input
            type="radio"
            id="no"
            name="attending"
            value="no"
            checked={formData.attending === "no"}
            onChange={handleChange}
            required
          />
          No
        </label>
      </div>

      <label htmlFor="excuse">
        <strong>Excuse:</strong>{" "}
        <span id="excuse-extra">(type n/a if attending)</span>
      </label>
      <input
        type="text"
        name="excuse"
        id="excuse"
        required
        value={formData.excuse}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
      {isLoading ? (
        <div id="loader">
          <ClipLoader
            color={"red"}
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        displayStatus && <SubmitMessage success={submitStatus} msg={msg} />
      )}
    </form>
  );
};

export default Form;
