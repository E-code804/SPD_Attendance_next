"use client";
// components/AttendanceForm.js
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import DataList from "./DataList";
import SubmitMessage from "./SubmitMessage";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes", // Default to 'Yes'
    excuse: "",
  });
  const [submitStatus, setSubmitStatus] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const disabled = false;

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    const currentDate = new Date().toISOString().split("T")[0];
    const oldDate = localStorage.getItem("date");
    setIsLoading(true);
    if (disabled) {
      setSubmitStatus(false);
      setDisplayStatus(true);
      setMsg("Form is currently disabled.");
    } else if (!(currentDate === oldDate)) {
      fetch(`/api/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Bad Restaurant ID");
        }
        setFormData({
          name: "",
          attending: "yes", // Default to 'Yes'
          excuse: "",
        });
        setSubmitStatus(true);
        setDisplayStatus(true);
        setMsg("Success!");
        setIsLoading(false);
        localStorage.setItem("date", currentDate);
      });
    } else {
      setSubmitStatus(false);
      setDisplayStatus(true);
      setIsLoading(false);
      setMsg("Naughty boy, you already submitted!");
    }
  };

  return (
    <form id="form" onSubmit={handleSubmit} disabled={true}>
      <h2>Attendance Form</h2>

      <label htmlFor="name">
        <strong>Name:</strong>{" "}
        <span id="auto">
          Look/press arrow for autocomplete, if your name is not there text Erik
          P
        </span>
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

        <label htmlFor="yes">Yes</label>
        <input
          type="radio"
          id="yes"
          name="attending"
          value="yes"
          checked={formData.attending === "yes"}
          onChange={handleChange}
          required
        />
        <label htmlFor="no">No</label>
        <input
          type="radio"
          id="no"
          name="attending"
          value="no"
          checked={formData.attending === "no"}
          onChange={handleChange}
          required
        />
      </div>

      <label htmlFor="excuse">
        <strong>Excuse:</strong> (type n/a if attending)
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
          <BeatLoader color={"crimson"} size={15} loading={true} />
        </div>
      ) : (
        displayStatus && <SubmitMessage success={submitStatus} msg={msg} />
      )}
    </form>
  );
};

export default Form;
