import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateFAQ() {
  const { id } = useParams();  // Retrieve the id from the URL
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // For redirecting after update

  useEffect(() => {
    // Fetch the existing FAQ to pre-fill the form
    fetch(`http://localhost:8000/faqs/${id}`)
      .then(response => response.json())
      .then(data => {
        setQuestion(data.question);
        setAnswer(data.answer);
      })
      .catch(err => setError('Failed to fetch FAQ details.'));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/faqs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update FAQ');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        navigate('/faq');  // Redirect to FAQ list after update
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to update FAQ.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update FAQ</h2>
      {error && <p>{error}</p>}
      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>
      <label>
        Answer:
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </label>
      <button type="submit">Update FAQ</button>
    </form>
  );
}

export default UpdateFAQ;
