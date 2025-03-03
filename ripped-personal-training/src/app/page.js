// pages/dashboard.js
"use client"
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Award,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulate API fetch for user data
    setTimeout(() => {
      setUserData({
        name: "Alex Johnson",
        membership: "Premium",
        credits: 8,
        streakDays: 14,
        trainer: "Sarah Williams",
        progress: 72,
      });

      setUpcomingSessions([
        {
          id: 1,
          type: "Strength Training",
          trainer: "Sarah Williams",
          date: "2025-03-05",
          time: "10:00 AM",
          duration: "60 min",
        },
        {
          id: 2,
          type: "HIIT",
          trainer: "Mike Thompson",
          date: "2025-03-08",
          time: "09:30 AM",
          duration: "45 min",
        },
        {
          id: 3,
          type: "Yoga",
          trainer: "Emma Davis",
          date: "2025-03-10",
          time: "08:00 AM",
          duration: "60 min",
        },
      ]);

      setPastSessions([
        {
          id: 4,
          type: "Strength Training",
          trainer: "Sarah Williams",
          date: "2025-03-01",
          time: "10:00 AM",
          duration: "60 min",
          completed: true,
        },
        {
          id: 5,
          type: "HIIT",
          trainer: "Mike Thompson",
          date: "2025-02-26",
          time: "09:30 AM",
          duration: "45 min",
          completed: true,
        },
        {
          id: 6,
          type: "Yoga",
          trainer: "Emma Davis",
          date: "2025-02-23",
          time: "08:00 AM",
          duration: "60 min",
          completed: false,
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard | Ripped</title>
        <meta
          name="description"
          content="Manage your personal training sessions"
        />
      </Head>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Ripped</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hi, {userData?.name || "User"}
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {userData?.name ? userData.name.charAt(0) : "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

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
                    <p className="font-semibold">
                      {userData.credits} remaining
                    </p>
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
                <p className="text-sm text-gray-500 mb-2">
                  Progress toward goal
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${userData.progress}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-500 mt-1">
                  {userData.progress}%
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Link
                href="/book"
                className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition flex justify-between items-center"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Plus className="text-blue-600 w-5 h-5" />
                  </div>
                  <span className="font-medium">Book New Session</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              <Link
                href="/progress"
                className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition flex justify-between items-center"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Award className="text-green-600 w-5 h-5" />
                  </div>
                  <span className="font-medium">View Progress</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              <Link
                href="/trainer"
                className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition flex justify-between items-center"
              >
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
                    onClick={() => setActiveTab("upcoming")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === "upcoming"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Upcoming Sessions
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === "past"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Past Sessions
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "upcoming" ? (
                  <>
                    <h2 className="text-lg font-medium mb-4">
                      Your Upcoming Sessions
                    </h2>
                    {upcomingSessions.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        You have no upcoming sessions scheduled.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                          <div
                            key={session.id}
                            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                          >
                            <div className="flex-1">
                              <h3 className="font-medium">{session.type}</h3>
                              <p className="text-gray-500">
                                with {session.trainer}
                              </p>
                            </div>
                            <div className="flex-1 flex items-center space-x-1 mt-2 md:mt-0">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {formatDate(session.date)}
                              </span>
                            </div>
                            <div className="flex-1 flex items-center space-x-1 mt-2 md:mt-0">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {session.time} ({session.duration})
                              </span>
                            </div>
                            <div className="flex space-x-2 mt-4 md:mt-0">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded">
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
                    <h2 className="text-lg font-medium mb-4">
                      Your Past Sessions
                    </h2>
                    {pastSessions.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        You have no past sessions.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {pastSessions.map((session) => (
                          <div
                            key={session.id}
                            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                          >
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h3 className="font-medium">{session.type}</h3>
                                {session.completed ? (
                                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                    Completed
                                  </span>
                                ) : (
                                  <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                    Missed
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-500">
                                with {session.trainer}
                              </p>
                            </div>
                            <div className="flex-1 flex items-center space-x-1 mt-2 md:mt-0">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {formatDate(session.date)}
                              </span>
                            </div>
                            <div className="flex-1 flex items-center space-x-1 mt-2 md:mt-0">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {session.time} ({session.duration})
                              </span>
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

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">
              © 2025 FitConnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/help" className="text-gray-500 hover:text-gray-700">
                Help
              </Link>
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-700"
              >
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
