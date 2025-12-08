# WasteLess Web App - Frontend

> **Empowering individuals and households to significantly reduce food waste, save money, and combat climate change.**

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Target Audience](#target-audience)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Backend Integration](#backend-integration)
- [Success Metrics](#success-metrics)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Team](#team)

---

## 🌍 About the Project

**WasteLess** is a smart, user-friendly web application designed to combat climate change by reducing household food waste. It acts as a personal kitchen assistant that helps users track their food inventory, provides proactive expiration alerts, and offers intelligent recipe suggestions to use up existing ingredients.

### Project Mission

To empower individuals and households to significantly reduce their food waste, helping them save money and directly combat climate change by minimizing methane emissions from landfills.

---

## ❗ The Problem

Household food waste is a major global issue:

- When food rots in landfills, it releases **methane**, a greenhouse gas **over 25 times more potent** at trapping heat than carbon dioxide
- This waste is often caused by poor planning, forgotten items, and lack of knowledge about using existing food
- Households waste an average of **30% of purchased food**
- This directly contributes to climate change and represents significant financial loss

---

## ✅ The Solution

WasteLess is a smart, user-friendly web tool that:

- **Tracks food inventory** across fridge, freezer, and pantry
- **Sends proactive alerts** before items expire
- **Suggests intelligent recipes** based on available ingredients and expiration dates
- **Visualizes positive impact** through savings metrics (financial & environmental)
- Makes food management **simple and rewarding**

By making food management engaging and rewarding, we prevent waste at its source.

---

## 👥 Target Audience

We are building this app for two primary user groups:

### 🌱 The Eco-Conscious User ("The Planet Saver")
- **Motivation**: Reduce environmental footprint and combat climate change
- **Needs**: Clear, tangible data on environmental impact (e.g., CO₂ saved)
- **Value**: The app's mission and contribution to a larger cause

### 💰 The Budget-Conscious User ("The Money Saver")
- **Motivation**: Financial benefits of not throwing away food
- **Needs**: Clear data on financial savings
- **Value**: Improved household budget and efficiency

---

## ✨ Core Features

### 1. **Seamless Onboarding**
- Quick, friendly, and educational onboarding flow
- Explains value proposition (save money, help the planet)
- Guided tutorial for adding first inventory item
- Permission requests (camera, notifications)

### 2. **Smart Inventory System**
- **Multiple Entry Methods**:
    - Manual entry by name
    - Barcode scanning (integrates with Open Food Facts API)
    - Photo-based entry (stretch goal with image recognition)
- **Categorization**: Fridge, Freezer, Pantry + custom locations
- **Sorting & Filtering**: By name, expiration date, or category

### 3. **Proactive Expiration Tracking & Alerts**
- Automatic expiration date calculation
- Smart shelf-life suggestions for common items
- Customizable push notifications
- Priority-based item highlighting

### 4. **Intelligent Recipe Engine**
- Ingredient-based recipe search
- Prioritizes items nearing expiration
- Simple, easy-to-follow recipe cards
- "Mark as Cooked" feature to auto-deduct ingredients

### 5. **Impact Dashboard**
- Track items as "Eaten" or "Wasted"
- Visual statistics with engaging charts
- **Key Metrics**:
    - 💰 Financial savings: "You've saved ₦XX this month!"
    - 🌍 Environmental impact: "You've saved XX kg of CO₂!"
    - 📊 Volume: "You've saved XX items from the landfill!"

### 6. **Food Donation Locator**
- Map integration showing nearby food banks and shelters
- Location-based recommendations
- Information on accepted items and hours

---

## 🛠 Tech Stack

### Frontend (This Repository)
- **Framework**: React.js 19.2.0
- **Styling**: Tailwind CSS 3.4.18
- **Routing**: React Router DOM 7.9.6
- **UI Components**:
    - Radix UI (Checkbox, Radio, Switch)
    - Lucide React (Icons)
    - React Icons
- **HTTP Client**: Axios 1.13.2
- **Notifications**: React Toastify 11.0.5
- **Testing**: React Testing Library, Jest

### Backend (Separate Repository)
- **Language**: Java
- **Database**: PostgreSQL
- **APIs**:
    - Open Food Facts API (barcode lookup)
    - Spoonacular API (recipe suggestions)
- **AI Integration**: Generative AI for dynamic recipe recommendations

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **bun** (recommended)
- **Backend API** running (see backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wasteles
   ```

2. **Install dependencies**
   ```bash
   # Using bun (recommended)
   bun install

   # OR using npm
   npm install
   ```

3. **Add your assets folder**
    - Place your `assets` folder in `src/` directory
    - Should contain:
        - `assets/images/` - Logo, user avatars, food items
        - `assets/icons/` - App icons (e.g., flowerpot.png)
        - `assets/illustrations/` - Onboarding and empty state illustrations

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   REACT_APP_SPOONACULAR_API_KEY=your_api_key_here
   ```

5. **Start the development server**
   ```bash
   # Using bun (recommended)
   bun run dev

   # OR using npm
   npm start
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
wasteles/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   └── images/
│   ├── components/
│   │   ├── modals/
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── FirstModal.jsx
│   │   │   ├── MainButton.jsx
│   │   │   ├── PageTop.jsx
│   │   │   └── ViceButton.jsx
│   │   ├── BottomNav.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── DesktopNav.jsx
│   │   ├── Header.jsx
│   │   ├── IconButton.jsx
│   │   ├── Input.jsx
│   │   ├── ItemCard.jsx
│   │   ├── Modal.jsx
│   │   ├── Modals.jsx
│   │   ├── Navbar.jsx
│   │   ├── SortAndFilter.jsx
│   │   └── StatCard.jsx
│   ├── context/
│   │   ├── AppContext.jsx
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── CheckEmail.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ImpactDashboard.jsx
│   │   ├── ImpactEmpty.jsx
│   │   ├── InventoryHomeEmpty.jsx
│   │   ├── InventoryHomeExpiring.jsx
│   │   ├── InventoryHomeSafe.jsx
│   │   ├── ItemDetails.jsx
│   │   ├── ItemEntry.jsx
│   │   ├── Login.jsx
│   │   ├── Notifications.jsx
│   │   ├── Onboarding.jsx
│   │   ├── RecipeDetails.jsx
│   │   ├── RecipePage.jsx
│   │   ├── RecipeSearch.jsx
│   │   ├── RecipeSearchNotFound.jsx
│   │   ├── RecipesEmpty.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── ResetSuccess.jsx
│   │   ├── Settings.jsx
│   │   ├── Signup.jsx
│   │   ├── SplashScreen.jsx
│   │   └── TallyScore.jsx
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 📜 Available Scripts

### `bun run dev` or `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
The build is optimized and minified for best performance.

### `npm run eject`
⚠️ **One-way operation** - Ejects from Create React App for full configuration control.

---

## 🔌 Backend Integration

This frontend application communicates with a **Java-based backend API** (separate repository).

### API Endpoints Expected:
- **Authentication**: `/api/auth/login`, `/api/auth/signup`
- **Inventory**: `/api/inventory/items`, `/api/inventory/add`, `/api/inventory/update`
- **Recipes**: `/api/recipes/search`, `/api/recipes/suggestions`
- **Impact**: `/api/impact/dashboard`, `/api/impact/statistics`
- **Notifications**: `/api/notifications/settings`

### Environment Configuration
Configure the backend API URL in your `.env` file:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 📊 Success Metrics

Our app aims to achieve:

- ✅ **30% reduction** in household food waste for active users within the first month
- 💰 **₦10,000 average savings** per user in avoided food loss
- 🌍 **5kg CO₂ prevented** per user monthly
- 📱 **Habit-forming engagement** promoting sustainable food management

---

## 🗺 Roadmap

### ✅ Current MVP Features (Month 1)
- Smart Inventory System
- Expiration Tracking & Alerts
- Recipe Engine
- Impact Dashboard
- Food Donation Locator

### 🔜 Future Development
- AI-powered personalized meal planning
- Integration with online grocery stores
- Smart kitchen device integration
- Community food-sharing hub
- Regional expansion with localized CO₂ data
- Mobile app versions (iOS/Android)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow React best practices
- Use functional components with hooks
- Maintain Tailwind CSS conventions
- Write meaningful commit messages

---

## 👨‍💻 Team & Roles

- **Project Manager**: Oversees progress and coordination
- **Frontend Engineer**: UI development and camera/barcode features
- **Backend Engineer**: Database, API, and alert systems
- **UI/UX Designer**: User experience and visual flow
- **Web Designer**: Responsive layouts and interactions
- **Generative AI Engineer**: Recipe recommendations and personalization

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Open Food Facts API** for barcode data
- **Spoonacular API** for recipe suggestions
- All contributors who help make food waste reduction accessible to everyone

---

## 📞 Contact & Support

For questions, suggestions, or support, please:
- Open an issue in this repository
- Contact the project team

---

<div align="center">

**WasteLess** - *Eat Smart, Waste Less, Live More* 🌱

Made with 💚 for a sustainable future

</div>
