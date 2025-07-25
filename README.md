# ⚽ ScoutHub
**ScoutHub** is a basic football scouting platform, still under development. It was created with the purpose of practicing applied mathematics, modern web development, and data handling. This document outlines the motivation, technologies, and initial vision for the project.

---

## 📌 Why this project?

ScoutHub was born as a personal project to combine my interests in programming and football with a few free courses I did for applied math. It is designed to:

- 🧠 Practice **mathematical concepts** I've studied through online courses
- 💻 Improve my skills with **Next.js** and modern component-based architecture
- 🔗 Work with **NoSQL databases (Firebase Firestore)** and structure efficient, real-time queries

---

## 🏗️ How it will be built

To apply mathematical reasoning, I plan to use models and formulas to **compare players** based on their statistics. Examples:

- Normalize raw data like goals, assists, passes, and tackles using **z-score or min-max scaling**
- Calculate **similarity vectors** between players for ranking and comparison
- Display **radar charts**, bar graphs, and positional data to visually compare performance

Players will be searchable by team or competition (focused on Brazilian leagues and cups), and each user will be able to organize them into **custom folders/lists**.

---

## 🎯 Main Objective

The ultimate goal is to create an analysis tool that allows users to:

- 🔍 Search players from the main Brazilian leagues and cups (Série A, B, Copa do Brasil, etc.)
- 🗂️ Organize players into personalized folders and lists
- 📊 Visualize detailed statistics
- 🆚 Compare players side-by-side using math-based models
- 📈 Use visual components like **radar charts** and bar graphs

---

## 🔧 Planned Technologies

- **Framework:** Next.js
- **Database:** Firebase
- **Authentication:** Firebase Authentication
- **APIs:** API-Football (via RapidAPI)
- **Charts:** Recharts or Chart.js (for visualizations)
- **Design System:** Tailwind CSS
