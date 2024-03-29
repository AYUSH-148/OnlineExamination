import React, { useContext, useState } from 'react';
import examContext from '../../context/exam/examContext'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import EditSubject from './EditSubject';

export default function SubjectItem(props) {
    const [isHovered, setIsHovered] = useState(false);
    const context = useContext(examContext);
    const navigate = useNavigate();
    const { deleteSubject } = context;
    const { sub } = props;
    const handleDelete = async (sub) => {
        console.log("Deleting...")
        await deleteSubject(sub._id);
    }
    const handleQns = (sub) => {
        navigate(`/questions/${sub._id}`)
    }
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <>

            <div className={` bg-slate-300  w-1/5 ml-10 my-10 rounded-md border border-thin
             h-40 hover:transition-all hover:scale-95 hover:duration-125 mx-auto   `}>
                <HoverCard>
                    <button
                        className=' bg-slate-200 text-black hover:bg-slate-200 flex flex-col justify-between items-center  rounded-md h-full w-full ' onClick={() => handleQns(sub)}  >
                        <div className='text-base'>
                            <div className='mt-2'><b>Code: </b>{sub.code}</div>
                            <div><b>Duration: </b>{sub.duration.hours}:{sub.duration.minutes}:{sub.duration.seconds}</div>
                        </div>

                        <h4 className='font-bold text-lg mb-10'>{sub.name}</h4>
                        
                        <HoverCardTrigger>
                                <i onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="fa-solid fa-circle-info mt-5"></i>
                        </HoverCardTrigger>

                    </button>
                    <HoverCardContent className=" mt-2 ml-20  bg-slate-300 ">
                        <p > <pre>{sub.description}</pre></p>
                        <Link to={`/sub_stats/${sub._id}`} className='border border-thin border-black rounded-sm bg-slate-200  ml-2 px-2'>Subject Stats</Link>
                        <Link to={`/questions/${sub._id}`} className='border border-thin border-black rounded-sm bg-slate-200  ml-2 px-2'>View Questions</Link>
                        <div className='flex justify-between items-center  w-full mt-2 '>
                            <button onClick={() => handleDelete(sub)} className='mt-3 mr-0 mb-0 pb-0 pt-0 bg-slate-300 hover:bg-slate-200  text-black '  ><i className="fa-solid fa-trash  text-lg "></i></button>
                            <Dialog>
                                <DialogTrigger><i class="fa-solid fa-pen-to-square"></i>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Subject</DialogTitle>
                                        <DialogDescription>
                                          <EditSubject sub = {sub}/>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                           
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div >
        </>
    );
}
