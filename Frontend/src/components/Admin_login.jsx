import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "../../src/components/ui/use-toast"
import { ToastAction } from "../../src/components/ui/toast"


// import { useAlert } from 'react-alert'

export default function Admin_login() {
  const { toast } = useToast()
  
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
      toast({
        title: "Logged in successfully!",
        description: "...loading",
      })
      localStorage.setItem('token', json.auth_token);
      navigate(`/subjects/${json.admin._id}`);
    }
    else {
      toast({
        variant: "destructive",
        title: "Invalid credentials!",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  };


  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input className="border border-slate-800"
              type="email"  name="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input className="border border-slate-800"
              type="password"  name="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-black">Submit</button>
        </form>
      </div>
     

    </>
  );
}
