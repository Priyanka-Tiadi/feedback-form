import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      rating: rating,
      feedback: feedback,
    };

    try {
      await axios.post('http://localhost:5000/api/feedback', data);
      setMsg('Feedback submitted successfully!');
      setIsError(false);
      setName('');
      setRating('');
      setFeedback('');
    } catch (err) {
      console.error(err);
      setMsg('Something went wrong. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Feedback Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="5"
            required
          />

          <textarea
            placeholder="Your Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>

        {msg && (
          <p
            className={`mt-4 text-center font-medium ${
              isError ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default FeedbackForm;
