import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
const ChangePassword = () => {
    const { toast } = useToast()

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:7000/api/admin/change_password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('token')
            },

            body: JSON.stringify({ oldPassword, newPassword, confirmPassword })
        });

        const json = await response.json();

        if (json.success) {
            toast({
                title: "Success!",
                description: "Password is changed",
            })

        }
        else {
            toast({
                variant: "destructive",
                title: "Invalid credentials!",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }



return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center mt-28">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                    Old Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="oldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                    New Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="newPassword"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Change Password
                </button>
               
            </div>
        </div>
    </form>

);
};

export default ChangePassword;
