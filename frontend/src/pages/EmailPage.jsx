import React from "react";
import EmailDetail from "../components/EmailDetails";

const EmailPage = ({ emails, markAsFavorite }) => {
  return (
    <div className="email-page">
      <EmailDetail emails={emails} markAsFavorite={markAsFavorite} />
    </div>
  );
};

export default EmailPage;
