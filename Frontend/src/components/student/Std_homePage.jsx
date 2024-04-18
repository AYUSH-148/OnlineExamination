import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ExamContext from '../../context/exam/examContext';
import { useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { badgeVariants } from "../ui/badge";
import HomeSidebar from './HomeSidebar';
import StdSubmarks from './StdSubmarks';
import PerQnStats from './PerQnStats';
import { qnsActions } from '../../store/qns';
const StdHomePage = () => {
  const { id } = useParams();
  const context = useContext(ExamContext);
  const { Sub, getallSubjects, OneStd, getStudent, getAttemptsPerStd, isAttempts, createAttempt } = context;
  const navigate = useNavigate();
  const [subjectList, setSubjectList] = useState([]);
  const dispatch = useDispatch();
  const setSubList =() => {
    const list = Sub.filter(sub => {
      if (OneStd && OneStd.rollNo) {
        if (OneStd.rollNo.includes("MnC") && sub.code.includes("MnC")) {
          return true;
        } else if (OneStd.rollNo.includes("IT") && sub.code.includes("IT")) {
          return true;
        } else if (OneStd.rollNo.includes("EEE") && sub.code.includes("EEE")) {
          return true;
        } else if (OneStd.rollNo.includes("Cs") && sub.code.includes("Cs")) {
          return true;
        }
      }
      return false;
    });
    setSubjectList(list);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        await getallSubjects();
        await getStudent();
        await getAttemptsPerStd(id);
      } else {
        navigate("/student_login");
      }
    };
    fetchData();
  },[isAttempts]);

  useEffect(() => {
    setSubList();
  },[Sub,OneStd]);

  const handleClick = async (sub) => {
    dispatch(qnsActions.setTimer(sub.duration));
    await createAttempt(id, sub._id, true);
  };

  return (
    <>
     
      {subjectList.length > 0 ? (
        <>
         <HomeSidebar subjectList = {subjectList} />
        <div>
          {subjectList.map(sub => {
            const studentAttempts = isAttempts.filter(attempt => attempt.student === id && attempt.subject === sub._id);
            const isAttempted = studentAttempts.length > 0 ? studentAttempts[0].isAttempted : false;

            return (
              <div className="w-2/3 mb-20 ml-14 border border-slate-400 rounded-lg overflow-hidden" key={sub._id}>
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                  <div>
                    <h3 className="text-2xl leading-6 text-gray-800 font-bold">
                      {sub.name}{sub.availability==="Active"?<span className={badgeVariants({ variant: "secondary" })}>{sub.availability}</span>:<span className={badgeVariants({ variant: "destructive" })}>{sub.availability}</span>}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">See subject information below</p>
                  </div>
                  {!isAttempted && sub.availability==="Active" && (
                    <Link to={`/std_questions/${id}/${sub._id}`} className='text-black mt-3'>
                      <span onClick={() => handleClick(sub)} className='bg-slate-400 py-3 px-3 rounded-sm border hover:bg-[#c1d1d8] border-slate-600'>
                        Start Test
                      </span>
                    </Link>
                  )}
                </div>
                <div className="border-t border-gray-200">
                  <dl className="grid grid-cols-3 gap-x-6 gap-y-4 px-4 py-5">
                    <div className="col-span-1 border-r-2 border-b-2">
                      <dt className="text-lg font-medium text-gray-600 mt-2">Status</dt>
                      <dd className="mt-1 text-lg text-gray-900">{isAttempted ? <p className='text-green-500'>Your response is saved</p> : "Not attempted"} </dd>
                    </div>
                    <div className="col-span-1 border-r-2 border-b-2">
                      <dt className="text-lg font-medium text-gray-600 mt-2">Number of Questions</dt>
                      <dd className="mt-1 text-lg text-gray-900">{sub.length}</dd>
                    </div>
                    <div className="col-span-1 border-b-2">
                      <dt className="text-lg font-medium text-gray-600">Maximum Marks</dt>
                      <dd className="mt-1 text-lg text-gray-900">{sub.max_marks}</dd>
                    </div>
                    <div className="col-span-1 border-r-2">
                      <dt className="text-lg font-medium text-gray-600">Subject Code</dt>
                      <dd className="mt-1 text-lg text-gray-900">{sub.code}</dd>
                    </div>
                    <div className="col-span-1 border-r-2">
                      <dt className="text-lg font-medium text-gray-600">Duration</dt>
                      <dd className="mt-1 text-lg text-gray-900">{sub.duration.hours}:{sub.duration.minutes}:{sub.duration.seconds}</dd>
                    </div>
                    <div className="col-span-3 border-t-2">
                      <dt className="text-lg font-medium text-gray-600">Guidelines:</dt>
                      <dd className="mt-2 text-lg text-gray-900"><pre>{sub.description ? sub.description : "lorem24k;lj' dslkgkndslgmasg a[kfnaf ag a'akd'g 'dofagm'agm a;gkmaglma a'gka'gmag a'dgl"}</pre></dd>
                    </div>
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
        </>
      ) : <Loader />}
      <hr className='w-[70vw] ml-5 ' />
      <div className='mt-6'>
        <p className='text-3xl ml-14 font-semibold ' id="stats" >STATISTICS</p>
        <StdSubmarks Sub={Sub} id={id} />
      </div>
      <hr className='w-[62%] ml-16' />
      <div>
        <PerQnStats Sub={Sub} id={id} />
      </div>
    </>
  );
}

export default StdHomePage;
