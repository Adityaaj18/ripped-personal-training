// pages/progress.js
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Award, TrendingUp, Activity, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Progress() {
    const [loading, setLoading] = useState(true);
    const [progressData, setProgressData] = useState(null);

    useEffect(() => {
        // Simulate API fetch for progress data
        setTimeout(() => {
            setProgressData({
                weeklyWorkouts: [5, 6, 4, 7, 5, 8, 6], // Example workout data for the last 7 days
                totalSessions: 52,
                completedWorkouts: {
                    StrengthTraining: 18,
                    HIIT: 15,
                    Yoga: 10,
                    Cardio: 9
                },
                streakDays: 14,
                goalProgress: 72
            });
            setLoading(false);
        }, 1000);
    }, []);

    const weeklyWorkoutData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Workouts',
                data: progressData?.weeklyWorkouts || [],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
            },
        ],
    };

    const workoutTypeData = {
        labels: Object.keys(progressData?.completedWorkouts || {}),
        datasets: [
            {
                label: 'Workout Types',
                data: Object.values(progressData?.completedWorkouts || {}),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Workout Progress',
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Progress | FitConnect</title>
                <meta name="description" content="Track your fitness progress" />
            </Head>

            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-gray-900">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Overview Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <TrendingUp className="text-blue-600 w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Sessions</p>
                                    <p className="text-2xl font-semibold">{progressData.totalSessions}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Activity className="text-green-600 w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Current Streak</p>
                                    <p className="text-2xl font-semibold">{progressData.streakDays} days</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                                <div className="bg-orange-100 p-3 rounded-full">
                                    <Award className="text-orange-600 w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Goal Progress</p>
                                    <p className="text-2xl font-semibold">{progressData.goalProgress}%</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Weekly Workout Chart */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-medium mb-4">Weekly Workout Frequency</h2>
                                <Bar options={options} data={weeklyWorkoutData} />
                            </div>

                            {/* Workout Type Chart */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-medium mb-4">Completed Workout Types</h2>
                                <Pie data={workoutTypeData} />
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="bg-white rounded-lg shadow p-6 mt-8">
                            <h2 className="text-lg font-medium mb-4">Achievements</h2>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-700">
                                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                                    First Workout Completed
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                                    5-Day Workout Streak
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                                    10+ Total Sessions
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </main>

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
