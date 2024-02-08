import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast,Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useAlert } from 'react-alert'

export default function Admin_login() {
  const alert = useAlert()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/admin/admin_login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })

    });
    const json = await response.json();
    
    if (json.success) {
      alert.success('Successfully Logged In', {
        timeout: 5000, // custom timeout just for this one alert
        type: 'success',
      })
      localStorage.setItem('token', json.auth_token);
      navigate(`/subjects/${json.admin._id}`);
    }
    else {
      alert.error('Invalid Login details', {
        timeout: 5000, // custom timeout just for this one alert
        type: 'error',
      })
    }
  };


  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email" id="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password" id="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> */}
    </>
  );
}
