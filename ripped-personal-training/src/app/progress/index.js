// pages/progress.js
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Award, TrendingUp, Activity, CheckCircle, Flame, User, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineController
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineController
);

export default function Progress() {
    const [loading, setLoading] = useState(true);
    const [progressData, setProgressData] = useState(null);
    const [calorieData, setCalorieData] = useState(null);
    const [goal, setGoal] = useState('');
    const [userGoal, setUserGoal] = useState(null);
    const [bodyMetrics, setBodyMetrics] = useState(null);
    const [nutritionLog, setNutritionLog] = useState({ protein: 0, carbs: 0, fat: 0 });
    const [meal, setMeal] = useState('');
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        // Simulate API fetch for progress data
        setTimeout(() => {
            setProgressData({
                weeklyWorkouts: [5, 6, 4, 7, 5, 8, 6],
                totalSessions: 52,
                completedWorkouts: {
                    StrengthTraining: 18,
                    HIIT: 15,
                    Yoga: 10,
                    Cardio: 9
                },
                streakDays: 14,
                goalProgress: 72,
                recentWorkouts: [
                    { id: 1, date: '2025-03-10', time: '8:00 AM', type: 'Yoga', trainer: 'Emma Davis', duration: '60 min' },
                    { id: 2, date: '2025-03-08', time: '9:30 AM', type: 'HIIT', trainer: 'Mike Thompson', duration: '45 min' },
                    { id: 3, date: '2025-03-05', time: '10:00 AM', type: 'Strength Training', trainer: 'Sarah Williams', duration: '60 min' },
                ]
            });

            setCalorieData({
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                intake: [2000, 2200, 1800, 2500, 2100, 2400, 2300],
                burn: [300, 350, 250, 400, 320, 380, 360]
            });

            setBodyMetrics({
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                weight: [150, 148, 146, 145],
                bmi: [24.5, 24.2, 23.9, 23.7],
                bodyFat: [22, 21.5, 21, 20.5]
            });

            setBadges([
                { id: 1, name: 'First Workout', description: 'Completed your first workout!', icon: CheckCircle },
                { id: 2, name: '5-Day Streak', description: 'Maintained a 5-day workout streak!', icon: Flame },
            ]);

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

    const calorieChartData = {
        labels: calorieData?.labels || [],
        datasets: [
            {
                label: 'Calorie Intake',
                data: calorieData?.intake || [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Calories Burned',
                data: calorieData?.burn || [],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
                fill: true
            }
        ],
    };

    const bodyMetricsData = {
        labels: bodyMetrics?.labels || [],
        datasets: [
            {
                label: 'Weight (lbs)',
                data: bodyMetrics?.weight || [],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'BMI',
                data: bodyMetrics?.bmi || [],
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Body Fat (%)',
                data: bodyMetrics?.bodyFat || [],
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                tension: 0.4,
                fill: true
            }
        ],
    };

    const calorieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Calorie Intake vs Burn',
            },
        },
    };

    const bodyMetricsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Body Metrics Over Time',
            },
        },
    };

    const chartOptions = {
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

    const handleSetGoal = () => {
        setUserGoal(goal);
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleLogMeal = () => {
        // Simulate meal logging
        const protein = Math.floor(Math.random() * 30); // Random protein intake
        const carbs = Math.floor(Math.random() * 50);    // Random carb intake
        const fat = Math.floor(Math.random() * 20);      // Random fat intake

        setNutritionLog({
            protein: nutritionLog.protein + protein,
            carbs: nutritionLog.carbs + carbs,
            fat: nutritionLog.fat + fat,
        });

        setMeal(''); // Clear the input
    };

    const handleShareProgress = () => {
        // Simulate sharing to social media
        alert('Sharing your progress on social media!');
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

                        {/* Goal Setting */}
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-lg font-medium mb-4">Set Your Fitness Goal</h2>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="e.g., Lose 10 pounds, Run a marathon"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleSetGoal}
                                >
                                    Set Goal
                                </button>
                            </div>
                            {userGoal && (
                                <div className="mt-4">
                                    <p className="text-gray-500">Your Goal: {userGoal}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-green-600 h-2.5 rounded-full"
                                            style={{ width: `${progressData.goalProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-right text-sm text-gray-500 mt-1">{progressData.goalProgress}% Complete</p>
                                </div>
                            )}
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Weekly Workout Chart */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-medium mb-4">Weekly Workout Frequency</h2>
                                <Bar options={chartOptions} data={weeklyWorkoutData} />
                            </div>

                            {/* Workout Type Chart */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-medium mb-4">Completed Workout Types</h2>
                                <Pie data={workoutTypeData} />
                            </div>
                        </div>

                        {/* Calorie Tracking Chart */}
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-lg font-medium mb-4">Calorie Tracking (Last 7 Days)</h2>
                            <Line options={calorieChartOptions} data={calorieChartData} />
                        </div>

                        {/* Body Metrics Chart */}
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-lg font-medium mb-4">Body Metrics Over Time</h2>
                            <Line options={bodyMetricsOptions} data={bodyMetricsData} />
                        </div>

                        {/* Nutrition Logging */}
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-lg font-medium mb-4">Nutrition Logging</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="e.g., Breakfast, Lunch, Dinner"
                                    value={meal}
                                    onChange={(e) => setMeal(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleLogMeal}
                                >
                                    Log Meal
                                </button>
                            </div>
                            <div>
                                <p className="text-gray-500">Daily Nutrition:</p>
                                <p className="text-sm">Protein: {nutritionLog.protein}g, Carbs: {nutritionLog.carbs}g, Fat: {nutritionLog.fat}g</p>
                            </div>
                        </div>

                        {/* Recent Workout Log */}
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-lg font-medium mb-4">Recent Workout Log</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Time
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Trainer
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Duration
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {progressData?.recentWorkouts.map(workout => (
                                            <tr key={workout.id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {formatDate(workout.date)}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {workout.time}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {workout.type}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {workout.trainer}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {workout.duration}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Rewards and Badges */}
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-lg font-medium mb-4">Rewards and Badges</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {badges.map(badge => (
                                    <div key={badge.id} className="border rounded-lg p-4 flex flex-col items-center">
                                        <badge.icon className="w-6 h-6 text-yellow-500 mb-2" />
                                        <h3 className="font-medium">{badge.name}</h3>
                                        <p className="text-gray-500 text-sm text-center">{badge.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
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

                        {/* Social Sharing */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium mb-4">Share Your Progress</h2>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                                onClick={handleShareProgress}
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share on Social Media
                            </button>
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
