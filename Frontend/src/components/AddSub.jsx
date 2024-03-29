import React, { useState, useContext } from 'react';
import examContext from '../context/exam/examContext'
import { useToast } from "../../src/components/ui/use-toast"
export default function AddSub() {
    const context = useContext(examContext);
    const { createSubject} = context;
    const { toast } = useToast()
    

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('00:00:00');
   
   
    const handleSubmit =async (e) => {
        const fixDuration = (duration)=>{
            const [hours, minutes, seconds] = duration.split(':');
            let newduration = {hours, minutes, seconds};
            return newduration
        }
        e.preventDefault();
        let dur = fixDuration(duration);
        console.log("chl ja");
        console.log(dur);
        await createSubject(code, name,dur);
        toast({
            title: "Added!",
            description: "Subject is included",
        })
    };

    return (
        <>
            <form className='ml-40 mb-4 ' onSubmit={handleSubmit}>
               <div className='add_sub pr-3'>
                <div>
                    <label htmlFor="code" className='ml-2'>Subject Code:</label>
                    <input
                        type="text"  name="code" value={code}
                        onChange={(e) => setCode(e.target.value)} className="border border-slate-800"
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="name"  className='ml-2'>Subject Name:</label>
                    <input
                        type="text" name="name" value={name}
                        onChange={(e) => setName(e.target.value)} className="border border-slate-800"
                        required
                    />
                </div>
                <div>
                <label htmlFor="duration"  className='ml-2'>Duration:</label>
                    <input type="text"  name="duration" placeholder="hh:mm:ss"
                     pattern="[0-9]{2}:[0-5][0-9]:[0-5][0-9]" 
                     title="Please enter a valid duration in the format hh:mm:ss"  className="border border-slate-800 "
                     onChange={(e) => setDuration(e.target.value)}
                     value={duration} 
                     required/>
                </div>
                </div>

                <button type="submit" className='bg-sky-300 ml-6 w-20 mt-5 hover:bg-slate-400'>Add</button>

            </form>

        </>
    );
}
