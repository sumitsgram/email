import React from "react";
import "../style/EmailList.css"; // Add CSS for styling

const EmailList = ({ emails, handleSelectEmail, selectedEmail }) => {
  return (
    <div className="email-list">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`email-item ${
            email.id === selectedEmail?.id ? "selected" : ""
          } ${email.isRead ? "read" : "unread"}`}
          onClick={() => handleSelectEmail(email.id)}>
          {/* Avatar - First character of sender's first name */}
          <div className="avatar">{email.from.charAt(0)}</div>

          {/* Email content */}
          <div className="email-content">
            <h4>
              {email.subject}
              {email.isFavorite && <span className="favorite-icon">★</span>}
            </h4>
            <p>{email.shortDescription}</p>
            <span>
              {new Date(email.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
