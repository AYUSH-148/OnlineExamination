import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await fetch(`https://onlineexamination.onrender.com/api/admin/check-login`, {
            method: 'GET',
            headers: {
              'auth_token': localStorage.getItem('token'),
            },
          });
          const json = await response.json();
          if (json.success) {
            navigate(`/admin_home/${json.admin._id}`);
          }
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      }
    };

    checkLoggedIn();
  }, [navigate]);

  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://onlineexamination.onrender.com/api/admin/admin_login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();

    if (json.success) {
      toast({
        title: "Success!",
        description: "Logged in successfully",
      });
      localStorage.setItem('token', json.auth_token);
      navigate(`/admin_home/${json.admin._id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid credentials!",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <>
      <div className='back_img min-h-screen flex flex-col justify-center'>
        <Dialog>
          <DialogTrigger>
            <i className="text-[32px] text-white z-[100] fa-solid fa-shield-halved fixed right-8 top-4 transition  duration-300 hover:scale-125 "></i>
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col justify-center items-center h-[48vh] bg-white p-4 sm:p-8">
              <h1 className="text-3xl font-semibold mb-2">Welcome Admin</h1>
              <p className="text-lg text-center mb-2">Keep track of up-to-date stats.</p>
              <form onSubmit={handleSubmit} className="rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md">
                <div className="mb-4 relative">
                  <i className="fa-solid fa-envelope absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400"></i>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder='admin@gmail.com'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border pl-10 pr-3 border-gray-300 rounded-md mt-1 py-2 w-full'
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                  <div className='relative mt-1'>
                    <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder='1234'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className='border pl-10 pr-3 py-2 w-full border-gray-300 rounded-md mt-1'
                    />
                  </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-full">Verify</button>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        <div className='flex flex-col items-center text-center '>
          <h1 className='font-bold text-4xl sm:text-[100px] md:text-6xl lg:text-8xl text-gray-700'>Welcome to <span className='playfair-display-sc-black text-orange-500'>Examify</span></h1>
          <div className='font-bold text-lg md:text-2xl mt-3 w-4/5 md:w-2/3 lg:w-1/2'>
            Join to become a member of <span className='text-gray-700'>Digital examination platform</span>
          </div>
        </div>

        <div className='my-4 mt-10 flex flex-col md:flex-row space-y-2 justify-center items-center  md:space-y-0 md:space-x-4'>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-all ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" role="button">
            <Link to="/student_signup">Join as Student <i className="fa-solid fa-rocket ml-1"></i></Link>
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg">
            <Link to="/student_login" role="button">Already a member?</Link>
          </button>
        </div>
      </div>
    </>
  );
}
