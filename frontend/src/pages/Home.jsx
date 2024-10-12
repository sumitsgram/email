import React, { useState, useEffect } from "react";
import EmailList from "../components/EmailList";
import { fetchEmails, fetchEmailDetails } from "../api/emailApi";
import "../style/Home.css";

const Home = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // New state for error handling
  const [filter, setFilter] = useState("all"); // Track current filter

  // Fetch emails when the component loads
  useEffect(() => {
    const getEmails = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const emailData = await fetchEmails();
        setEmails(emailData);
      } catch (err) {
        setError("Failed to load emails.");
      }
      setLoading(false);
    };

    getEmails();
  }, []);

  // Handle selecting an email
  const handleSelectEmail = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const emailDetails = await fetchEmailDetails(id); // Fetch email details
      const updatedEmails = emails.map((email) =>
        email.id === id ? { ...email, isRead: true } : email
      );
      setEmails(updatedEmails);
      setSelectedEmail(emailDetails);
    } catch (err) {
      setError("Failed to load email details.");
    }
    setLoading(false);
  };

  // Handle marking/unmarking an email as favorite
  const toggleFavorite = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
      )
    );

    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail((prevEmail) => ({
        ...prevEmail,
        isFavorite: !prevEmail.isFavorite,
      }));
    }
  };

  // Handle changing the filter (all, favorites, read, unread)
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filter emails based on the selected filter
  const filteredEmails = emails.filter((email) => {
    if (filter === "favorites") return email.isFavorite;
    if (filter === "read") return email.isRead;
    if (filter === "unread") return !email.isRead;
    return true;
  });

  return (
    <div className="home-page">
      <h1>Email</h1>

      {/* Error state */}
      {error && <div className="error-message">{error}</div>}

      {/* Filter options */}
      <div className="filter-options">
        <button
          onClick={() => handleFilterChange("all")}
          className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button
          onClick={() => handleFilterChange("favorites")}
          className={filter === "favorites" ? "active" : ""}>
          Favorites
        </button>
        <button
          onClick={() => handleFilterChange("read")}
          className={filter === "read" ? "active" : ""}>
          Read
        </button>
        <button
          onClick={() => handleFilterChange("unread")}
          className={filter === "unread" ? "active" : ""}>
          Unread
        </button>
      </div>

      <div className="email-container">
        {/* Master section: Email List */}
        <div className="email-master">
          {loading && <p>Loading emails...</p>}
          {!loading && (
            <EmailList
              emails={filteredEmails}
              handleSelectEmail={handleSelectEmail}
              selectedEmail={selectedEmail}
            />
          )}
        </div>

        {/* Slave section: Email Details */}
        <div className="email-slave">
          {loading ? (
            <div className="placeholder">
              <p>Loading email...</p>
            </div>
          ) : selectedEmail ? (
            <div className="email-details">
              <h2>{selectedEmail.subject}</h2>
              <p>{selectedEmail.body}</p>
              <span>
                {new Date(selectedEmail.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>

              {/* Mark as Favorite Button */}
              <button
                className={`favorite-btn ${
                  selectedEmail.isFavorite ? "favorited" : ""
                }`}
                onClick={() => toggleFavorite(selectedEmail.id)}>
                {selectedEmail.isFavorite
                  ? "Unmark as Favorite"
                  : "Mark as Favorite"}
              </button>
            </div>
          ) : (
            <div className="placeholder">
              <p>Select an email to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
