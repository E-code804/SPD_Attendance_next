// import React from "react";
import names from "@/names";

const DataList = () => {
  return (
    <datalist id="names">
      {names.map((n) => (
        <option key={n} value={n}></option>
      ))}
    </datalist>
  );
};

export default DataList;
