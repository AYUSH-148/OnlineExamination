import React, { useContext, useState } from 'react';
import examContext from '../../context/exam/examContext'
import { Link } from 'react-router-dom';
import EditSubject from './EditSubject';
import { badgeVariants } from "../ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,

    DialogTrigger,
} from "../ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"

export default function SubjectItem(props) {
    const context = useContext(examContext);
    const { deleteSubject } = context;
    const { sub } = props;
    const handleDelete = async () => {
        console.log("Deleting...")
        await deleteSubject(sub._id);
    }

    return (
        <>
            <div className="w-[39vw] ml-[3%] border border-slate-400 rounded-lg overflow-hidden mt-4" key={sub._id}>
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center relative">
                    <div>
                        <h3 className="text-lg leading-6 text-gray-800 font-bold">
                            {sub.name}
                            {sub.availability === "Active" ? (
                                <span className={badgeVariants({ variant: "secondary" })}>{sub.availability}</span>
                            ) : (
                                <span className={badgeVariants({ variant: "destructive" })}>{sub.availability}</span>
                            )}
                        </h3>
                        <p className="my-2 max-w-2xl text-sm text-gray-500">See subject information below</p>
                        <Link to={`/questions/${sub._id}`} className='text-black '>
                            <div className='bg-slate-400 py-2 w-[180px] rounded-sm border text-center hover:bg-[#c1d1d8] border-slate-600 '>
                                Start creating test
                            </div>
                        </Link>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <span className='absolute top-5  right-20'>
                                    <Link to={`/sub_stats/${sub._id}`}>
                                        <i className="fa-solid fa-file-pen"></i>
                                    </Link>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>View Subject Stats</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Dialog>
                        <DialogTrigger>
                            <i className="fa-solid fa-pen-to-square absolute right-12 top-6"></i>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogDescription>
                                <EditSubject sub={sub} />
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                    <span className="absolute right-5 top-5 cursor-pointer" onClick={handleDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </span>
                </div>
                <div className="border-t border-gray-200 flex">
                    <div className="px-4 py-3 sm:w-1/4">
                        <dt className="text-sm font-medium text-gray-500">Questions count</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sub.length}</dd>
                    </div>
                    <div className="px-4 py-3 sm:w-1/4">
                        <dt className="text-sm font-medium text-gray-500">Maximum Marks</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sub.max_marks}</dd>
                    </div>
                    <div className="px-4 py-3 sm:w-1/4">
                        <dt className="text-sm font-medium text-gray-500">Subject Code</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sub.code}</dd>
                    </div>
                    <div className="px-4 py-3 sm:w-1/4">
                        <dt className="text-sm font-medium text-gray-500">Duration</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sub.duration.hours}:{sub.duration.minutes}:{sub.duration.seconds}</dd>
                    </div>
                </div>
                <div className="border-t border-gray-200">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Guidelines</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"><pre>{sub.description ? sub.description : "lorem24k;lj' dslkgkndslgmasg a[kfnaf ag a'akd'g 'dofagm'agm a;gkmaglma a'gka'gmag a'dgl"}</pre></dd>
                    </div>
                </div>
            </div>

        </>

    );

}
