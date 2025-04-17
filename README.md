# 📅 Ripped Training Appointments Management System

A modern web-based platform to schedule, manage, and confirm training appointments with real-time SMS notifications and an intuitive admin dashboard.

---

## 📌 Abstract

The **Ripped Training Appointments Management System** simplifies the process of scheduling sessions with personal trainers. With features like registration, booking, file uploads, SMS notifications, and an admin dashboard for appointment management, the system enhances user experience while ensuring scalability and performance through a robust tech stack.

---

## 📖 Table of Contents

- [Abstract](#-abstract)
- [Introduction](#-introduction)
- [Scope of the Project](#-scope-of-the-project)
- [System Architecture](#-system-architecture)
- [Core Features](#-core-features)
- [Tech Stack Explanation](#-tech-stack-explanation)
- [Setup & Installation](#-setup--installation)
- [Implementation Overview](#-implementation-overview)
- [Challenges Faced](#-challenges-faced)
- [Future Enhancements](#-future-enhancements)
- [Citations & References](#-citations--references)

---

## 🔍 Introduction

The Training Appointments Management System provides a structured interface for users to schedule training sessions and for administrators to manage those appointments. It supports SMS-based notifications, responsive design, and performance monitoring, catering to both functional and operational aspects of appointment management.

---

## 🎯 Scope of the Project

### In Scope
- Customer registration
- Appointment scheduling with trainers
- SMS notifications on appointment confirmation
- Admin interface for managing and updating appointments
- File uploads via Appwrite Storage
- Application monitoring with Sentry

### Out of Scope
- Payment processing
- Real-time chat


---

## 🧱 System Architecture


---

## ✨ Core Features

### 👥 Customer
- **User Registration/Login**  
  Secure authentication using Appwrite’s built-in Auth services.
- **Book Appointments with Trainers**  
  Real-time booking interface with available trainer slots.
- **Receive SMS on Confirmation**  
  Automatic SMS updates using Twilio.
- **Responsive Design**  
  Fully functional on all screen sizes and devices.
- **Secure File Upload**  
  Store documents and media using Appwrite Storage.

### 🛠️ Admin
- **Dashboard View**  
  Centralized view of all upcoming and past appointments.
- **Approve, Reschedule, or Cancel Appointments**  
  Update and notify users directly.
- **Search and Filter Users/Appointments**  
  Manage user base efficiently.
- **Real-time Monitoring with Sentry**  
  Detect, log, and act on errors with alerts and logs.

---

## ⚙️ Tech Stack Explanation

| Technology   | Description |
|--------------|-------------|
| **Next.js**  | Frontend framework with SSR |
| **TypeScript** | Ensures type safety |
| **TailwindCSS** | Utility-first CSS for fast styling |
| **ShadCN UI** | Accessible, reusable components |
| **Appwrite** | Backend-as-a-Service (Auth, DB, Storage, Functions) |
| **Twilio** | SMS gateway for notifications |
| **Sentry** | Real-time performance and error monitoring |

---

## 🚀 Setup & Installation



### 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Adityaaj18/ripped-personal-training.git
cd ripped-personal-training

# Install dependencies
npm install

# Create and configure .env file
cp .env.example .env
# Add Appwrite, Twilio, and Sentry credentials

# Start development server
npm run dev
```
## ⚠️ Challenges Faced

### 🔄 Serverless Limitations
Appwrite serverless functions occasionally experienced cold starts and execution delays.  
**Solution:** Implemented retry logic and optimized function timeouts to mitigate the impact.

### 🔐 Access Control
Managing roles and permissions in Appwrite requires manual setup.  
**Solution:** Enforced access control on both frontend and backend using claim-based conditions.

### 📱 SMS Delivery Issues
Delays were observed with Twilio SMS in certain regions, affecting user trust.  
**Planned Enhancement:** Introduce a fallback notification system using email for better reliability.

## 📚 Citations & References

1. [Appwrite Documentation](https://appwrite.io/docs)  
   Official documentation for Appwrite – backend services including authentication, database, functions, and storage.

2. [Twilio SMS API](https://www.twilio.com/docs/sms)  
   Learn how to send and manage SMS messages with Twilio’s programmable messaging API.

3. [Next.js Documentation](https://nextjs.org/docs)  
   The official documentation for building full-stack React apps with Next.js.

4. [TailwindCSS Guide](https://tailwindcss.com/docs)  
   Comprehensive utility-first CSS framework documentation for rapidly building modern UIs.

5. [Sentry JavaScript Docs](https://docs.sentry.io/platforms/javascript/)  
   Guides and SDK references for monitoring performance and tracking errors in JavaScript applications using Sentry.

6. [ShadCN UI Components](https://ui.shadcn.dev/)  
   Accessible and customizable components built on top of Radix UI, styled with Tailwind.


