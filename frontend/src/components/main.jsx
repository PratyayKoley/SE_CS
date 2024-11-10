import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Component() {
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();  // Hook for navigation

    const handleCardClick = (userType) => {
        setSelectedUser(userType);

        // Navigate to different pages based on user type
        if (userType === 'student') {
            navigate('/studentPage');  // Replace with the actual student page route
        } else if (userType === 'admin') {
            navigate('/adminPage');  // Replace with the actual admin page route
        } else if (userType === 'teacher') {
            navigate('/teacherPage');  // Replace with the actual teacher page route
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-5">
            <h1 className="text-white mb-8 text-4xl text-center font-bold">
                Select User Type
            </h1>
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-5 md:space-y-0"> {/* Stack cards vertically on small screens */}
                <div
                    className={`w-full md:w-72 p-8 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 text-white bg-gradient-to-r from-blue-300 to-blue-600 hover:scale-110 ${
                        selectedUser === 'student' ? 'transform -translate-y-1' : ''
                    }`}
                    onClick={() => handleCardClick('student')}
                >
                    <h2 className="text-2xl mb-3">Student User</h2>
                    <p className="opacity-90">Access student features and resources</p>
                </div>
                <div
                    className={`w-full md:w-72 p-8 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 text-white bg-gradient-to-r from-pink-300 to-pink-500 hover:scale-110 ${
                        selectedUser === 'admin' ? 'transform -translate-y-1' : ''
                    }`}
                    onClick={() => handleCardClick('admin')}
                >
                    <h2 className="text-2xl mb-3">Admin User</h2>
                    <p className="opacity-90">Manage system and user accounts</p>
                </div>
                <div
                    className={`w-full md:w-72 p-8 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 text-white bg-gradient-to-r from-green-300 to-green-500 hover:scale-110 ${
                        selectedUser === 'teacher' ? 'transform -translate-y-1' : ''
                    }`}
                    onClick={() => handleCardClick('teacher')}
                >
                    <h2 className="text-2xl mb-3">Teacher User</h2>
                    <p className="opacity-90">Access teacher features and resources</p>
                </div>
            </div>
            {selectedUser && (
                <p className="mt-8 text-white text-xl font-semibold animate-fadeIn">
                    You selected: {selectedUser.charAt(0).toUpperCase() + selectedUser.slice(1)} user
                </p>
            )}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}
