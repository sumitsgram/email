import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmailDetail = ({ emails, markAsFavorite }) => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const selectedEmail = emails.find((email) => email.id === parseInt(id));
    setEmail(selectedEmail);
  }, [id, emails]);

  if (!email) {
    return <p>Loading email...</p>;
  }

  return (
    <div className="email-detail">
      <h2>{email.subject}</h2>
      <p>{email.body}</p>
      <p>{email.date}</p>
      <button onClick={() => markAsFavorite(email.id)}>
        {email.isFavorite ? "Unmark Favorite" : "Mark as Favorite"}
      </button>
    </div>
  );
};

export default EmailDetail;
