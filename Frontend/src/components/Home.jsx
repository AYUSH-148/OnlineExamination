import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <>
    <div>
        <button className="primary-btn"> <Link to="/student_signup" role="button">New Student </Link></button>
        <button className="primary-btn"><Link to="/student_login" role="button">Login  </Link></button>
        <div><button className="secondary-btn"><Link to="/admin_login" role="button">Admin </Link></button></div>
    </div>
       
    </>
  );
}
