import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <>
    <div>
        <div>
          <h2>Admin Section</h2>
          <div><button className="secondary-btn"><Link to="/admin_login" role="button">Admin </Link></button></div>
        </div>
        <br />
        <div>
          <h2>Student User</h2>
          <button className="primary-btn"> <Link to="/student_signup" role="button">New Student </Link></button>
          <button className="primary-btn"><Link to="/student_login" role="button">Have an Account? Sign in  </Link></button>
        </div>

        
    </div>
       
    </>
  );
}
