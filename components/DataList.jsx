import names from "@/names";

// This component renders the autocomplete name list when entering one's name.
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
