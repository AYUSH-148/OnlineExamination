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
        <div className="w-[80vw] mx-auto flex justify-center items-start">
            {/* Remember Section */}
            <div className="w-1/3 h-[60vh] p-6 bg-gray-200 rounded-md">
                <h2 className="text-lg pt-12 font-semibold mb-4">Remember</h2>
                <ol className="list-decimal ml-6 text-md flex flex-col gap-y-3">
                    <li>Subject code format: &lt;branch&gt;subject. Ex: Cs-MaIV</li>
                    <li>Duration should be less than 3 hours. (03:00:00)</li>
                    <li>Make exam available when Availability is active and make it unavailable when expired.</li>
                    <li>Description should contain exam guidelines and questions related information.</li>
                </ol>
            </div>

            {/* Form */}
            <div className="w-2/3  shadow-md rounded-md p-6 ml-6 h-[60vh] ">
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-x-7 ">
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
                            className="shadow appearance-none border rounded w-[90%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-36"
                            placeholder="Keep it in points"
                            required
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="availability" className="block text-gray-700 text-sm font-semibold mb-2">Availability:</label>
                        <div className="flex items-center">
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

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 w-[90%] rounded focus:outline-none focus:shadow-outline">Add Subject</button>

                </form>

            </div>
        </div>
    );

}
