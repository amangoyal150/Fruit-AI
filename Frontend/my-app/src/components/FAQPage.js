// frontend/src/components/FAQPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FAQPage.css';

function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/faqs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setFaqs(data))
      .catch(error => setError(error));
  }, []);
  function handleDelete(id) {
    fetch(`http://localhost:8000/faqs/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        // Remove the deleted FAQ from the state
        setFaqs(faqs.filter(faq => faq.id !== id));
      })
      .catch(error => console.error('Error:', error));
  }
  
  return (
    <div className="faq-page">
      <h1>FAQs</h1>
      {error && <p>Error: {error.message}</p>}
      <Link to="/faq/create" className="btn btn-primary">Create New FAQ</Link>
      {faqs.length === 0 ? (
        <p>No FAQs available.</p>
      ) : (
        faqs.map(faq => (
          <div key={faq.id} className="faq-item">
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
            <Link to={`/faq/update/${faq.id}`} className="btn btn-secondary">Edit</Link> {/* Link to update FAQ */}
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(faq.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}


export default FAQPage;
