import React,{useState} from 'react';
import { useNavigate } from 'react-router';
export default function Std_login() {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/students/std_login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rollNo,password })

    });
    const json = await response.json();
    // console.log(json.std._id)

    if (json.success) {
     
      localStorage.setItem('token', json.auth_token); 
      navigate(`/std_sub/${json.std._id}`);
    }
    else{
      
      console.log("Sorry cant login")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="rollNo">Roll No:</label>
        <input  type="text"   name="rollNo"  value={rollNo}  className="border border-slate-800"
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input  type="password" name="password"  value={password}  className="border border-slate-800"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-black">Submit</button>
    </form>
  );
}
