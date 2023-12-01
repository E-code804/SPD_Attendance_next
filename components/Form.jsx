"use client";
// components/AttendanceForm.js
import { useState } from "react";
import DataList from "./DataList";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes", // Default to 'Yes'
    excuse: "",
  });

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., make a POST request

    // For demonstration purposes, log the form data
    console.log("Form submitted:", formData);
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
    });
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h2>Attendance Form</h2>

      <label htmlFor="name">
        <strong>Name:</strong> (Look for autocomplete, if your name is not there
        text me)
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
    </form>
  );
};

export default Form;
