import React, { useState } from 'react';

export default function StudentEnrollment() {
    const [name, setName] = useState('');
    const [semester, setSemester] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [llc, setLlc] = useState('');
    const [elective1, setElective1] = useState('');
    const [elective2, setElective2] = useState('');
    const [openElective, setOpenElective] = useState('');
    const [availableElectives, setAvailableElectives] = useState([]);
    const [availableOpenElectives, setAvailableOpenElectives] = useState([]);
    const [availableLlc, setAvailableLlc] = useState([]);
    const [showLlc, setShowLlc] = useState(false);
    const [electiveCount, setElectiveCount] = useState(0);

    const semesterSubjects = {
        '1': {
            subjects: ['Matrices and Differential Calculus', 'Engineering Physics', 'Engineering Graphics', 'Basic Electrical and Electronics Engineering', 'Innovation and Design Thinking', 'Essential Computing Skills for Engineers', 'Measuring Instruments and Testing Tools', 'Art of Communication'],
            llc: true,
        },
        '2': {
            subjects: ['Integral Calculus and Probability Theory', 'Engineering Chemistry', 'Programming Fundamentals', 'Human Health Systems', 'Digital Electronics', 'Essential Psychomotor Skills for Engineers', 'Creative Coding in Python', 'Indian knowledge System', 'Introduction to Emerging Technologies'],
            llc: true,
        },
        '3': {
            subjects: ['Discrete Maths and Statistics', 'Computer Organization and Architecture', 'Data Structures', 'Object Oriented Programming with JAVA', 'Law for engineers', 'Financial Planning, Taxation and Investment', 'Human Values and Professional Ethics', 'Community Engagement Project', 'Honors/Double Minor Course'],
            llc: true,
            electives: [
                { value: 'ml', label: 'Machine Learning' },
                { value: 'cloud', label: 'Cloud Computing' },
                { value: 'ai', label: 'Artificial Intelligence' },
            ],
            electiveCount: 2,
        },
        '4': {
            subjects: ['Linear Algebra and Business Statistics', 'Analysis of Algorithms', 'Database Management System', 'Data Analytics and Visualization', 'Emerging Technology and Law', 'Web Programming', 'Modern Indian Language', 'Technology Entrepreneurship', 'Technology Innovation for Sustainable Development', 'Honors/Double Minor Course'],
            llc: true,
            electives: [
                { value: 'iot', label: 'IoT' },
                { value: 'blockchain', label: 'Blockchain' },
            ],
            electiveCount: 1,
        },
        '5': {
            subjects: ['Operating System', 'Computer Network', 'Machine learning', 'Honors/Double Minor Course', 'Cryptography and Computer Security', 'Health, Wellness and Psychology', 'Public relation and Corporate Communication', 'Program Elective lab'],
            llc: false,
            electives: [
                { value: 'cloud', label: 'Cloud Computing' },
                { value: 'ai', label: 'Artificial Intelligence' },
            ],
            openElectives: [
                { value: 'fintech', label: 'FinTech' },
                { value: 'arvr', label: 'AR/VR' },
                { value: 'robotics', label: 'Robotics' },
            ],
            electiveCount: 1,
            openElectiveCount: 1,
        },
        '6': {
            subjects: ['Honors/Double Minor Course', 'Theoretical Computer Science', 'data Warehousing and mining', 'cloud Computing', 'Emotional and spiritual intelligence', 'Artificial intelligence', 'Programming Elective Lab A', 'Programming Elective Lab B', 'Deep Learning'],
            llc: false,
            electives: [
                { value: 'ml', label: 'Machine Learning' },
                { value: 'cybersec', label: 'Cyber Security' },
                { value: 'blockchain', label: 'Blockchain' },
            ],
            electiveCount: 2,
        },
    };

    const llcOptions = [
        { value: 'english', label: 'English' },
        { value: 'hindi', label: 'Hindi' },
        { value: 'french', label: 'French' },
        { value: 'german', label: 'German' },
    ];

    const handleSemesterChange = (e) => {
        const selectedSemester = e.target.value;
        setSemester(selectedSemester);
        setSubjects(semesterSubjects[selectedSemester]?.subjects || []);
        setShowLlc(semesterSubjects[selectedSemester]?.llc || false);
        setAvailableElectives(semesterSubjects[selectedSemester]?.electives || []);
        setAvailableOpenElectives(semesterSubjects[selectedSemester]?.openElectives || []);
        setElectiveCount(semesterSubjects[selectedSemester]?.electiveCount || 0);
        setAvailableLlc(llcOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = { name, semester, subjects, llc, elective1, elective2, openElective };

        // Submit the form data to the backend
        fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/students/enroll-student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                alert('Student enrolled successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-lightblue-400 to-darkblue-600 text-white">

            <form onSubmit={handleSubmit} className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-4xl border border-white/30">
                <h2 className="text-4xl mb-8 text-center font-semibold">Student Enrollment</h2>

                {/* Flex container for horizontal layout */}
                <div className="flex flex-wrap gap-6">
                    {/* Name Input */}
                    <div className="flex-1 mb-6">
                        <label className="block mb-2 text-lg font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 rounded-md bg-white bg-opacity-30 placeholder-white text-white focus:ring-2 focus:ring-indigo-300 transition"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Semester Select */}
                    <div className="flex-1 mb-6">
                        <label className="block mb-2 text-lg font-medium">Semester</label>
                        <select
                            value={semester}
                            onChange={handleSemesterChange}
                            required
                            className="w-full p-3 rounded-md bg-white bg-opacity-30 text-black focus:ring-2 focus:ring-indigo-300 transition"
                        >
                            <option value="">Select Semester</option>
                            <option value="1">Sem 1</option>
                            <option value="2">Sem 2</option>
                            <option value="3">Sem 3</option>
                            <option value="4">Sem 4</option>
                            <option value="5">Sem 5</option>
                            <option value="6">Sem 6</option>
                        </select>
                    </div>
                </div>

                {/* Subjects displayed in a grid format */}
                <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium">Subjects</label>
                    <div className="grid grid-cols-3 gap-4">
                        {subjects.map((subject, index) => (
                            <div key={index} className="p-3 rounded-md bg-white bg-opacity-20 text-white shadow-md">
                                {subject}
                            </div>
                        ))}
                    </div>
                </div>

                {/* LLC (if applicable) */}
                {showLlc && (
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium">LLC</label>
                        <select
                            value={llc}
                            onChange={(e) => setLlc(e.target.value)}
                            required
                            className="w-full p-3 rounded-md bg-white bg-opacity-30 text-black focus:ring-2 focus:ring-indigo-300 transition"
                        >
                            <option value="">Select LLC course</option>
                            {availableLlc.map((llcOption) => (
                                <option key={llcOption.value} value={llcOption.value}>
                                    {llcOption.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Electives (if applicable) */}
                {electiveCount > 0 && (
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium">Elective(s)</label>
                        {[...Array(electiveCount)].map((_, i) => (
                            <select
                                key={i}
                                value={i === 0 ? elective1 : elective2}
                                onChange={(e) => i === 0 ? setElective1(e.target.value) : setElective2(e.target.value)}
                                required
                                className="w-full p-3 rounded-md bg-white bg-opacity-30 text-black focus:ring-2 focus:ring-indigo-300 transition mb-3"
                            >
                                <option value="">Select elective {i + 1}</option>
                                {availableElectives.map((elective) => (
                                    <option key={elective.value} value={elective.value}>
                                        {elective.label}
                                    </option>
                                ))}
                            </select>
                        ))}
                    </div>
                )}

                {/* Open Elective (if applicable) */}
                {availableOpenElectives.length > 0 && (
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium">Open Elective</label>
                        <select
                            value={openElective}
                            onChange={(e) => setOpenElective(e.target.value)}
                            required
                            className="w-full p-3 rounded-md bg-white bg-opacity-30 text-black focus:ring-2 focus:ring-indigo-300 transition"
                        >
                            <option value="">Select Open Elective</option>
                            {availableOpenElectives.map((oe) => (
                                <option key={oe.value} value={oe.value}>
                                    {oe.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full p-3 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition text-lg font-medium text-white"
                >
                    Enroll
                </button>
            </form>
        </div>
    );
}
