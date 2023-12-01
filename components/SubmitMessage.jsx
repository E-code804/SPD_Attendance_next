// components/SubmitMessage.js
const SubmitMessage = ({ success }) => {
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
        <div style={{ color: "green" }}>Success!</div>
      ) : (
        <div style={{ color: "red" }}>Naughty boy, you already submitted!</div>
      )}
    </div>
  );
};

export default SubmitMessage;
