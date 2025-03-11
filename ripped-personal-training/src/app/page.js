'use client'
// pages/dashboard.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Clock, User, Award, ChevronRight, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [pastSessions, setPastSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [membership, setMembership] = useState('');
    const [notification, setNotification] = useState(null);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [sessionToCancel, setSessionToCancel] = useState(null);

    useEffect(() => {
        // Simulate API fetch for user data
        setTimeout(() => {
            setUserData({
                id: 1,
                name: 'Alex Johnson',
                email: 'alex.johnson@example.com',
                membership: 'Premium',
                credits: 8,
                streakDays: 14,
                trainer: 'Sarah Williams',
                progress: 72
            });

            setName('Alex Johnson');
            setEmail('alex.johnson@example.com');
            setMembership('Premium');

            setUpcomingSessions([
                { id: 1, type: 'Strength Training', trainer: 'Sarah Williams', date: '2025-03-05', time: '10:00 AM', duration: '60 min' },
                { id: 2, type: 'HIIT', trainer: 'Mike Thompson', date: '2025-03-08', time: '09:30 AM', duration: '45 min' },
                { id: 3, type: 'Yoga', trainer: 'Emma Davis', date: '2025-03-10', time: '08:00 AM', duration: '60 min' },
            ]);

            setPastSessions([
                { id: 4, type: 'Strength Training', trainer: 'Sarah Williams', date: '2025-03-01', time: '10:00 AM', duration: '60 min', completed: true },
                { id: 5, type: 'HIIT', trainer: 'Mike Thompson', date: '2025-02-26', time: '09:30 AM', duration: '45 min', completed: true },
                { id: 6, type: 'Yoga', trainer: 'Emma Davis', date: '2025-02-23', time: '08:00 AM', duration: '60 min', completed: false },
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleOpenEditProfileModal = () => {
        setIsEditProfileModalOpen(true);
    };

    const handleCloseEditProfileModal = () => {
        setIsEditProfileModalOpen(false);
    };

    const handleSaveProfile = () => {
        // Simulate saving to a database
        setUserData({ ...userData, name: name, email: email, membership: membership });
        setNotification({ type: 'success', message: 'Profile updated successfully!' });
        setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
        handleCloseEditProfileModal();
    };

    const handleBookSession = () => {
        // Simulate booking a session
        setNotification({ type: 'success', message: 'Session booked successfully!' });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCancelSession = (session) => {
        setSessionToCancel(session);
        setIsCancelModalOpen(true);
    };

    const confirmCancelSession = () => {
        // Simulate cancelling the session
        setUpcomingSessions(upcomingSessions.filter(session => session.id !== sessionToCancel.id));
        setIsCancelModalOpen(false);
        setNotification({ type: 'success', message: 'Session cancelled successfully!' });
        setTimeout(() => setNotification(null), 3000);
    };

    const cancelCancelSession = () => {
        setIsCancelModalOpen(false);
        setSessionToCancel(null);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Dashboard | FitConnect</title>
                <meta name="description" content="Manage your personal training sessions" />
            </Head>

            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-md shadow-lg ${notification.type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`}>
                    <div className="flex items-center">
                        {notification.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />}
                        {notification.message}
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">FitConnect</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Hi, {userData?.name || 'User'}</span>
                            <button onClick={handleOpenEditProfileModal} className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold hover:bg-blue-700 transition">
                                {userData?.name ? userData.name.charAt(0) : 'U'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Edit Profile Modal */}
            {isEditProfileModalOpen && (
                <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                            <h2 className="text-lg font-medium mb-4">Edit Profile</h2>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="membership" className="block text-gray-700 text-sm font-bold mb-2">Membership:</label>
                                <select id="membership" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={membership} onChange={(e) => setMembership(e.target.value)}>
                                    <option>Basic</option>
                                    <option>Premium</option>
                                    <option>VIP</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleCloseEditProfileModal}>
                                    Cancel
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSaveProfile}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {/* User Stats */}
                        <div className="bg-white rounded-lg shadow mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Award className="text-blue-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Membership</p>
                                        <p className="font-semibold">{userData.membership}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Calendar className="text-green-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Credits</p>
                                        <p className="font-semibold">{userData.credits} remaining</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <User className="text-purple-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Personal Trainer</p>
                                        <p className="font-semibold">{userData.trainer}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-full">
                                        <Clock className="text-orange-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Workout Streak</p>
                                        <p className="font-semibold">{userData.streakDays} days</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 pb-6">
                                <p className="text-sm text-gray-500 mb-2">Progress toward goal</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${userData.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-right text-sm text-gray-500 mt-1">{userData.progress}%</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Link href="/book" className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Plus className="text-blue-600 w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Book New Session</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </Link>
                            <Link href="/progress" className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Award className="text-green-600 w-5 h-5" />
                                    </div>
                                    <span className="font-medium">View Progress</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </Link>
                            <Link href="/trainer" className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <User className="text-purple-600 w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Contact Trainer</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </Link>
                        </div>

                        {/* Sessions */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="border-b">
                                <nav className="flex">
                                    <button
                                        onClick={() => setActiveTab('upcoming')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'upcoming'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Upcoming Sessions
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('past')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'past'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Past Sessions
                                    </button>
                                </nav>
                            </div>

                            <div className="p-6">
                                {activeTab === 'upcoming' ? (
                                    <>
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-medium">Your Upcoming Sessions</h2>
                                            <button onClick={handleBookSession} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Book Now
                                            </button>
                                        </div>
                                        {upcomingSessions.length === 0 ? (
                                            <p className="text-gray-500 text-center py-8">You have no upcoming sessions scheduled.</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {upcomingSessions.map(session => (
                                                    <div key={session.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-medium">{session.type}</h3>
                                                            <p className="text-gray-500">with {session.trainer}</p>
                                                        </div>
                                                        <div className="flex-1 flex items-center space-x-1 mt-2 md:mt-0">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm text-gray-600">{formatDate(session.date)}</span>
                                                        </div>
                                                        <div className="flex-1 flex items-center space-x-1 mt-2 md:mt-0">
                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm text-gray-600">{session.time} ({session.duration})</span>
                                                        </div>
                                                        <div className="flex space-x-2 mt-4 md:mt-0">
                                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => handleCancelSession(session)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-lg font-medium mb-4">Your Past Sessions</h2>
                                        {pastSessions.length === 0 ? (
                                            <p className="text-gray-500 text-center py-8">You have no past sessions.</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {pastSessions.map(session => (
                                                    <div key={session.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center">
                                                                <h3 className="font-medium">{session.type}</h3>
                                                                {session.completed ? (
                                                                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Completed</span>
                                                                ) : (
                                                                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Missed</span>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-500">with {session.trainer}</p>
                                                        </div>
                                                        <div className="flex-1 flex items-center space-x-1 mt-2 md:mt-0">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm text-gray-600">{formatDate(session.date)}</span>
                                                        </div>
                                                        <div className="flex-1 flex items-center space-x-1 mt-2 md:mt-0">
                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm text-gray-600">{session.time} ({session.duration})</span>
                                                        </div>
                                                        {session.completed && (
                                                            <div className="mt-4 md:mt-0">
                                                                <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100">
                                                                    View Details
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </main>

            {/* Cancel Session Confirmation Modal */}
            {isCancelModalOpen && (
                <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                            <h2 className="text-lg font-medium mb-4">Confirm Cancellation</h2>
                            <p>Are you sure you want to cancel your {sessionToCancel?.type} session on {formatDate(sessionToCancel?.date)} at {sessionToCancel?.time}?</p>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={cancelCancelSession}>
                                    No, Keep Session
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={confirmCancelSession}>
                                    Yes, Cancel Session
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Footer */}
            <footer className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500">© 2025 FitConnect. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/help" className="text-gray-500 hover:text-gray-700">Help</Link>
                            <Link href="/privacy" className="text-gray-500 hover:text-gray-700">Privacy</Link>
                            <Link href="/terms" className="text-gray-500 hover:text-gray-700">Terms</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
