// components/SubmitMessage.js
const SubmitMessage = ({ success, msg }) => {
  return (
    <div
      style={{
        padding: "20px",
        border: `1px solid ${success ? "green" : "red"}`,
        borderRadius: "5px",
        textAlign: "center",
        marginTop: "8px",
      }}
    >
      {success ? (
        <div style={{ color: "green" }}>{msg}</div>
      ) : (
        <div style={{ color: "red" }}>{msg}</div>
      )}
    </div>
  );
};

export default SubmitMessage;
