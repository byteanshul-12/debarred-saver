#  Attendance Calculator

A funny  attendance tracking application that helps students monitor their attendance percentage and calculates how many classes they can bunk  or need to attend to maintain their required attendance to write exam

## ✨ Features

-  **Real-time Attendance Tracking** - Monitor your current attendance percentage
-  **Smart Calculations** - Instantly know how many classes you can bunk
-  **Safety Alerts** - Get warnings when your attendance is at risk
-  **Responsive Design** - Works seamlessly on all devices
-  **Data Persistence** - Your attendance data is saved locally
-  **Clean UI** - Modern and user-friendly interface
-  **Fast Performance** - Built with modern web technologies

## 🚀 Tech Stack

- **Frontend Framework:**  React
- **Build Tool:**  Vite
- **Runtime:**  Node.js
- **Language:**  TypeScript
- **Styling:**  CSS3

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/attendance-calculator.git
```

2. **Navigate to the project directory**
```bash
cd attendance-calculator
```

3. **Install dependencies**
```bash
npm install
```
or
```bash
yarn install
```

## 🎮 Usage

### Development Mode

Run the application in development mode with hot reload:

```bash
npm run dev
```
or
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```
or
```bash
yarn build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```
or
```bash
yarn preview
```

## 📖 How It Works

1. **Enter Your Details**
   - Input total classes conducted
   - Input classes attended
   - Set your required attendance percentage (default: 75%)

2. **Get Instant Results**
   - Current attendance percentage
   - Number of classes you can bunk while maintaining required percentage
   - Number of classes needed to attend if below threshold

3. **Visual Indicators**
   -  Green: Safe attendance level
   -  Yellow: Warning - approaching threshold
   -  Red: Critical - below required percentage

## 📁 Project Structure

```
attendance-calculator/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── AttendanceForm.tsx
│   │   ├── AttendanceDisplay.tsx
│   │   └── ResultsCard.tsx
│   ├── hooks/
│   │   └── useAttendance.ts
│   ├── utils/
│   │   └── calculations.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Key Calculations

### Current Attendance Percentage
```
Attendance % = (Classes Attended / Total Classes) × 100
```

### Classes You Can Bunk
```
If current attendance > required:
  Bunkable = (Classes Attended - (Required % × Total Classes)) / Required %
```

### Classes You Need to Attend
```
If current attendance < required:
  Required = ((Required % × Total Classes) - Classes Attended) / (1 - Required %)
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Reach out via email: anshultrip1234@gmail.com

---

⭐ If you find this project useful, please consider giving it a star on GitHub!

**Made with ❤️ and ☕ by students, for students**
