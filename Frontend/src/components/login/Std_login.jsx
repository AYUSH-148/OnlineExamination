import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"

export default function Std_login() {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [rollNoError, setRollNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await fetch(`http://localhost:7000/api/students/check-login`, {
            method: 'GET',
            headers: {
              'auth_token': localStorage.getItem('token'),
            },
          });
          const json = await response.json();
          if (json.success) {
            navigate(`/student_home/${json.std._id}`);
          }
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      }
    };
  
    checkLoggedIn();
  }, [navigate]);

  const handleRollNoChange = (e) => {
    const inputValue = e.target.value;
    setRollNo(inputValue);
    const isValid = /^20\d{2}[A-Za-z]{2,3}\d{3}$/.test(inputValue);
    setRollNoError(isValid ? '' : 'Roll number must be in the format 20XXDEPTXXX');
  };

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const isValid = inputValue.length >= 4;
    setPasswordError(isValid ? '' : 'Password must be at least 4 characters long');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rollNoError && !passwordError) {

      const response = await fetch(`http://localhost:7000/api/students/std_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollNo, password })

      });
      const json = await response.json();

      if (json.success) {
        toast({
          title: "Success!",
          description: "Logged in successfully",
        })
        localStorage.setItem('token', json.auth_token);
        navigate(`/student_home/${json.std._id}`);

      }
      else {
        toast({
          variant: "destructive",
          title: "Invalid input",
          description: "Please fix the errors in the form.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[75vh] bg-white">
      <h1 className="text-3xl font-semibold mb-4">Welcome back</h1>

      <p className="text-lg text-center mb-8">Login to see stats and give tests   </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={rollNo}
            placeholder='Ex. 2022IT100'
            onChange={handleRollNoChange}
            className={`border ${rollNoError ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1 px-3 py-2 w-full`}
            required
          />
          {rollNoError && <p className="text-red-500 text-xs mt-1">{rollNoError}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <div className='relative mt-1'>
            <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={`border ${passwordError ? 'border-red-500' : 'border-gray-300'} pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md`}

              required
            />
          </div>

          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-full">Verify</button>
      </form>
    </div>
  );
}
