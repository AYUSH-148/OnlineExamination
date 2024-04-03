import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:7000/api/students/forgot_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const json = await response.json();

    if (json.success) {
      setMessage('Mail sent successfully Please check your inbox and follow the instructions to reset your password.');
    } else {
      setMessage('Failed to send password reset email. Please try again later.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center mt-28">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-4">Please enter your email address below to reset your password. We will send a  reset link to your mail.</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-4 text-sm text-gray-700">
          {message && <p>{message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Reset Email
          </button>
        </div>
      </div>
    </form>
  );
}

export default ForgotPassword;
