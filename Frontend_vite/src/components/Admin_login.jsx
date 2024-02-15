import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

// import { useAlert } from 'react-alert'

export default function Admin_login() {
  let showGAlert = false;
  let showBAlert = false;
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
      showGAlert = true;
      localStorage.setItem('token', json.auth_token);
      navigate(`/subjects/${json.admin._id}`);
    }
    else {
      showBAlert = true;
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
      {showGAlert && <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Going Forward!
        </AlertDescription>
      </Alert>}

      {showBAlert && <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Invalid credentials.
        </AlertDescription>
      </Alert>}

    </>
  );
}
