import { useSelector } from "react-redux";

export default function MessageToast() {
  const messages = useSelector((state) => state.message);
  return (
    <>
      <div
        className="position-fixed top-0 end-0 pt-6 px-3"
        style={{ zIndex: "5" }}
      >
        {messages?.map((msg) => (
            <div
              id="liveToast"
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              key={msg.id}
            >
              <div
                className={`toast-header ${
                  msg.type === "success" ? "bg-light" : "bg-danger"
                }`}
              >
                <strong className="me-auto">{msg.title}</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
              <div className="toast-body">{msg.text}</div>
            </div>
          ))}
      </div>
    </>
  );
}
