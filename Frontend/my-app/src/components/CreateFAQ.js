// frontend/src/components/CreateFAQ.js

import React, { useState } from 'react';

function CreateFAQ() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/faqs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Date.now(), question, answer }), // Simple ID generation
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Optionally, update the FAQ list or reset form
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create FAQ</h2>
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
      <button type="submit">Create FAQ</button>
    </form>
  );
}

export default CreateFAQ;
