import React, { useState, useContext } from 'react';
import examContext from '../../context/exam/examContext'
import { useToast } from "../ui/use-toast"
export default function AddSub() {
    const context = useContext(examContext);
    const { createSubject } = context;
    const { toast } = useToast()


    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('00:00:00');

    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        const fixDuration = (duration) => {
            const [hours, minutes, seconds] = duration.split(':');
            let newduration = { hours, minutes, seconds };
            return newduration
        }
        e.preventDefault();
        let dur = fixDuration(duration);
        console.log("chl ja");
        console.log(dur);
        await createSubject(code, name, dur ,description);
        toast({
            title: "Added!",
            description: "Subject is included",
        })
    };

    return (
        <>
            <form className='mx-auto mb-4 w-3/4 ' onSubmit={handleSubmit}>
                <div className='add_sub pr-3 mb-4'>
                    <div>
                        <label htmlFor="code" className='ml-2'>Subject Code:</label>
                        <input
                            type="text" name="code" value={code}
                            onChange={(e) => setCode(e.target.value)} className="border border-slate-800"
                            pattern="^(MnC-|Cs|IT-|EEE-)[a-zA-Z0-9]*?(-I|-II|-III|-IV)$"
                            title="Code must start with branch and should end with year"  // Error message if pattern doesn't match
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className='ml-2'>Subject Name:</label>
                        <input
                            type="text" name="name" value={name}
                            onChange={(e) => setName(e.target.value)} className="border border-slate-800"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="duration" className='ml-2 '>Duration:</label>
                        <input type="text" name="duration" placeholder="hh:mm:ss"
                            pattern="[0-9]{2}:[0-5][0-9]:[0-5][0-9]"
                            title="Please enter a valid duration in the format hh:mm:ss" className="border border-slate-800 "
                            onChange={(e) => setDuration(e.target.value)}
                            value={duration}
                            required />
                    </div>

                </div>
                <div>
                    <label htmlFor="description" className='ml-6 mt-5'>Description</label> <br />
                    <textarea
                        type="text" name="description" value={description}
                        onChange={(e) => setDescription(e.target.value)} className="border border-slate-800 h-40 w-5/6 ml-6 mt-3 px-2 py-2"
                        placeholder='Keep it in points'
                        required
                    />
                </div>

                <button type="submit" className='bg-sky-300 ml-6 w-20 mt-5 hover:bg-slate-400'>Add</button>

            </form>

        </>
    );
}
