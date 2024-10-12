import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EmailPage from "./pages/EmailPage";
import { fetchEmails } from "./api/emailApi";

function App() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
      fetchEmails().then((data) => setEmails(data));
    }, []);

    const markAsFavorite = (id) => {
      setEmails(
        emails.map((email) =>
          email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
        )
      );
    };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/email/:id"
            element={
              <EmailPage emails={emails} markAsFavorite={markAsFavorite} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
