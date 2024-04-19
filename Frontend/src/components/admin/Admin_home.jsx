import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Admin_home = () => {
    const params = useParams();
    const { id } = params;

    return (
        <div className="flex flex-col justify-center items-center h-[67vh] ">
            <div className="mb-8">
                <i className="fa-solid fa-user-tie text-9xl"></i>
            </div>
            <h1 className="text-4xl  text-center mb-2 roboto-regular">Welcome to Admin Section</h1>
            <div className="my-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Link to={`/subjects/${id}`}>Start creating Exam</Link>
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 mx-2 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
                  <Link to="/student_details"> View Participation</Link>  
                </button>
                
            </div>

        </div>
    );
}

export default Admin_home;
