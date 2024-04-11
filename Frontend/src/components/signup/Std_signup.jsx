import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
const StudentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [rollNoError, setRollNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRollNoChange = (e) => {
    const inputValue = e.target.value;
    setRollNo(inputValue);
    const isValid = /^20\d{2}[A-Za-z]{2}\d{3}$/.test(inputValue);
    setRollNoError(isValid ? '' : 'Match Rollno format 20XXDEPTXXX');
  };
  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const isValid = inputValue.length >= 4;
    setPasswordError(isValid ? '' : 'Password must be at least 4 characters long');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rollNoError && !passwordError ) {
      const response = await fetch("http://localhost:7000/api/students/std_signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rollNo, email, password, phoneNo })
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.auth_token);
        toast({
          title: "Success",
          description: "Signed up successfully",
        })
        navigate("/student_login");
      } else {
        toast({
          variant: "destructive",
          title: "Failed to join .",
          description: "Please fix the errors in the form.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    }

  };

  return (
    <div className="flex flex-row my-24 w-2/3 mx-auto rounded-md shadow-lg px-5 py-10 border-2 ">
      <div className='px-10 flex flex-col items-center border-r-2'>
        <h1 className="text-2xl font-semibold mb-1">Join the Student Community</h1>
        <p className="text-lg text-center mb-5">Access tests assigned by admin and view stats</p>
        <div class="relative w-full h-[280px] mt-6 mr-6">
          <div class="absolute inset-0  ">
            <div class="absolute top-0 left-[46%]  ">
              <i class="fa-solid fa-computer text-3xl"></i>
            </div>
            <div class="absolute  bottom-[30%] right-[72%] transform ">
              <i class="fa-solid fa-user text-3xl"></i>
            </div>
            <div class="absolute bottom-[30%] left-[72%] ">
              <i class="fa-solid fa-book-open text-3xl"></i>
            </div>
            <div class="absolute top-1/3 left-[45%]  right-full ">
              <i class="fa-solid fa-shield-halved text-4xl"></i>
            </div>
            <div class="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <i class="fa-solid fa-arrow-down-long text-3xl"></i>
            </div>
            <div class="absolute bottom-28 right-[60%]    rotate-45 ">
              <i class="fa-solid fa-arrow-up-long text-3xl"></i>
            </div>
            <div class="absolute bottom-28 left-[60%]    rotate-45 ">
              <i class="fa-solid fa-arrow-left-long text-3xl"></i>
            </div>

            <div class="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <i class="fa-solid fa-arrow-down-long text-3xl"></i>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="ml-8 rounded-lg p-4 px-6 w-[53%] ">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Username:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="rollNo" className="block text-lg font-medium text-gray-700">Roll No:</label>
            <input
              type="text"
              name="rollNo"
              value={rollNo}
              placeholder='eg. 2022IT100'
              onChange={handleRollNoChange}
              required
              className={`border ${rollNoError ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1 px-3 py-2 w-full`}
            />
            {rollNoError && <p className="text-red-500 text-xs mt-1">{rollNoError}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="phoneNo" className="block text-lg font-medium text-gray-700">Phone No:</label>
            <input
              type="text"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required

            className={`border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1 px-3 py-2 w-full`}
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mb-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-full">Submit</button>
        <Link to="/student_login" className='underline text-sky-700'>Already a member?</Link>
      </form>

    </div>
  );
};

export default StudentForm;
