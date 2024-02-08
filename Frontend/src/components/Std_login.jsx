import React,{useState} from 'react';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
export default function Std_login() {
  const alert = useAlert();
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
      alert.success('Logged In successfully!', {
        timeout: 5000, // custom timeout just for this one alert
        type: 'success',
      })
      localStorage.setItem('token', json.auth_token); 
      navigate(`/std_sub/${json.std._id}`);
    }
    else{
      alert.error('Invlaid login credentials!', {
        timeout: 5000, // custom timeout just for this one alert
        type: 'error',
      })
      console.log("Sorry cant login")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="rollNo">Roll No:</label>
        <input  type="text"  id="rollNo"  name="rollNo"  value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input  type="password"  id="password"  name="password"  value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
