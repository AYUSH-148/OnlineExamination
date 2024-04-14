import React, { useState, useContext } from 'react';
import examContext from '../../context/exam/examContext';
import { useToast } from "../ui/use-toast";

export default function AddSub() {
    const context = useContext(examContext);
    const { createSubject } = context;
    const { toast } = useToast();

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [availability, setAvailability] = useState('Active');
    const [duration, setDuration] = useState('00:00:00');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fixDuration = (duration) => {
            const [hours, minutes, seconds] = duration.split(':');
            return { hours, minutes, seconds };
        };
        const dur = fixDuration(duration);
        await createSubject(code, name, dur, description, availability);
        toast({
            title: "Added!",
            description: "Subject is included",
        });
    };

    return (
        <>
            <div className="w-[80vw] resp_box mx-auto flex  gap-x-4 ">
                {/* Remember Section */}
                <div className="w-1/3 rem_box  p-6 bg-gray-200 rounded-md ">
                    <h2 className="text-lg pt-12 font-semibold mb-4">Remember</h2>
                    <ol className="list-decimal ml-6 text-md flex flex-col gap-y-3">
                        <li>Subject code format: &lt;branch&gt;subject. Ex: Cs-MaIV</li>
                        <li>Duration should be less than 3 hours. (03:00:00)</li>
                        <li>Make exam available when Availability is active and make it unavailable when expired.</li>
                        <li>Description should contain exam guidelines and questions related information.</li>
                    </ol>
                </div>

                {/* Form */}
                <div className="w-2/3  shadow-md rounded-md p-6 ml-6 h-full ">
                    <form onSubmit={handleSubmit} className="flex resp_form flex-wrap gap-x-7 h-full">
                        <div className="mb-4 w-full sm:w-auto">
                            <label htmlFor="code" className="block text-gray-700 text-sm font-semibold mb-2">Subject Code:</label>
                            <input
                                type="text"
                                name="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="shadow appearance-none border rounded w-full sm:w-43 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ex: Cs-MaIV"
                                required
                            />
                        </div>
                        <div className="mb-4 w-full sm:w-auto">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Subject Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="MathematicsIV"
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full sm:w-43 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4 w-full sm:w-auto">
                            <label htmlFor="duration" className="block text-gray-700 text-sm font-semibold mb-2">Duration:</label>
                            <input
                                type="text"
                                name="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="shadow appearance-none border rounded w-40 sm:w-38 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="hh:mm:ss"
                                pattern="[0-9]{2}:[0-5][0-9]:[0-5][0-9]"
                                title="Please enter a valid duration in the format hh:mm:ss"
                                required
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description:</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-36"
                                placeholder="Keep it in points"
                                required
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="availability" className="block text-gray-700 text-sm font-semibold mb-2">Availability:</label>
                            <div className="flex radio_box items-center">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="Active"
                                        checked={availability === 'Active'}
                                        onChange={() => setAvailability('Active')}
                                        className="form-radio h-4 w-4 text-blue-500"
                                    />
                                    <span className="ml-2 text-sm">Active</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="Expired"
                                        checked={availability === 'Expired'}
                                        onChange={() => setAvailability('Expired')}
                                        className="form-radio h-4 w-4 text-blue-500"
                                    />
                                    <span className="ml-2 text-sm">Expired</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 w-[100%] rounded focus:outline-none focus:shadow-outline">Add Subject</button>

                    </form>

                </div>
            </div>
            <style jsx>{`
            @media (max-width: 1220px)  {
            .resp_box{
                display: flex;
                flex-direction: column;
                align-items: center;
                
            }
            .ml-6{
                margin-left:0px;
            }
            .gap-x-4 {
                column-gap: 10px;
            }
           
            .w-1\\/3 {
                width: 80%;
            }
            .rem_box {
                margin: auto;
                margin-bottom: 20px;
            }
            .resp_form{
                width: 100%;
            }
            .pt-12{
                padding:10px 5px;
            }
            .radio_box{
                flex-direction: row
            }
            .w-2\\/3{
                width:80%;
            }
        
            }
            @media (max-width: 820px)  {
                .w-1\\/3, .w-2\\/3{
                    width:90%;
                }
            }
        @media (max-width: 650px) {
            .w-1\\/3, .w-2\\/3{
                width:90%;
            }
           
            input{
                margin-bottom: 10px;
            }
            .resp_box{
                font-size:20px;
            }
            label{
                font-size: 24px;
            }
            
        }
        @media (max-width: 530px) {
            .w-1\\/3, .w-2\\/3{
                width:100%;
            }
        }
       
        
        `}
            </style>
        </>
    );

}
