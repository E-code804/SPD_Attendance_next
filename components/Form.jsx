"use client";

import names from "@/names";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import DataList from "./DataList";
import SubmitMessage from "./SubmitMessage";

const Form = () => {
  // Data entered by users
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    excuse: "",
  });
  const [submitStatus, setSubmitStatus] = useState(false); // Determines if the form's submission was a success or not
  const [displayStatus, setDisplayStatus] = useState(false); // Displaying success/error message upon submission of form.
  const [isLoading, setIsLoading] = useState(false); // To play loading animation while form is being submitted.
  const [msg, setMsg] = useState(""); // Message user sees upon successful/unsuccessful form submission
  const disabled = false; // Determines if one can use the form or not.

  // Capitalize the name
  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Function to update multiple states
  const handleStatus = (submit, display, msg, load) => {
    setSubmitStatus(submit);
    setDisplayStatus(display);
    setMsg(msg);
    setIsLoading(load);
  };

  // Update form data state on input change
  const handleNameChange = async (e) => {
    // Ensuring name is properly capitalized.
    setFormData({
      ...formData,
      name: capitalizeName(e.target.value),
    });
  };

  const handleExcuse = (e) => {
    setFormData({
      ...formData,
      excuse: capitalizeName(e.target.value),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const currentDate = new Date().toISOString().split("T")[0];
    const oldDate = localStorage.getItem("date");

    // Check if form submission is allowed
    if (disabled) {
      handleStatus(false, true, "Form is disabled.", false);
    } else if (!(currentDate === oldDate)) {
      // Checking that name is in the names set.
      if (!names.includes(formData.name)) {
        handleStatus(
          false,
          true,
          "Please enter full name & proper spelling.",
          false
        );
        return;
      }

      // Make post request to API
      fetch(`/api/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          handleStatus(false, true, "Couldn't submit.", false);
          throw new Error("Couldn't submit.");
        }
        // Reset form data and update status on successful submission
        setFormData({
          name: "",
          attending: "yes",
          excuse: "",
        });
        handleStatus(true, true, "Success!", false);
        localStorage.setItem("date", currentDate);
      });
    } else {
      // Disallow the same person to submit the form twice.
      handleStatus(false, true, "You already submitted!", false);
    }
  };

  return (
    <form id="form" className="form" onSubmit={handleSubmit}>
      <h2>Chapter Attendance</h2>

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
        onChange={handleNameChange}
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
            onChange={() => setFormData({ ...formData, attending: "yes" })}
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
            onChange={() => setFormData({ ...formData, attending: "no" })}
            required
          />
          No
        </label>
      </div>

      {formData.attending === "no" && (
        <>
          <label htmlFor="excuse">
            <strong>Excuse:</strong>{" "}
            {/* <span id="excuse-extra">(type n/a if attending)</span> */}
          </label>
          <input
            type="text"
            name="excuse"
            id="excuse"
            required
            value={formData.excuse}
            onChange={handleExcuse}
          />
        </>
      )}

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
