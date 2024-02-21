import React from 'react';
import {Link} from 'react-router-dom';
import Admin_login from './Admin_login';
export default function Home() {
  return (
    <>
    <div>
        <div>
          <h2 className='ml-6 font-bold text-xl'>Admin Section</h2>
          <Admin_login />
        </div>
        <br />
        <br />
        <hr />
        <div>
          <h2 className='ml-8 font-bold text-xl mt-5'>User: Student</h2>
          <button className="primary-btn"> <Link to="/student_signup" role="button">New Student </Link></button>
          <button className="primary-btn"><Link to="/student_login" role="button">Have an Account? Sign in  </Link></button>
        </div>

        
    </div>
       
    </>
  );
}
