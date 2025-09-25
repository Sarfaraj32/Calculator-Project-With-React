# 📱 Calculator Project (React + Vite)

A simple and responsive calculator built with **React** and **Vite**.  
This app supports basic arithmetic operations (addition, subtraction, multiplication, division) and provides a clean, responsive UI.

---

## 📝 Summary

This project demonstrates how to build a calculator UI with React, manage state for numeric input, and perform operations. It is ideal for beginners learning React hooks, component structure, and event handling.

Key features:

- Digit input and display
- Basic arithmetic operations (`+`, `-`, `×`, `÷`)
- Clear / all-clear functionality
- Responsive, minimal styling
- Live evaluation of expressions
- Lightweight and easy to extend

---

## 📝 About This App

This calculator allows users to:

- Perform basic arithmetic operations (`+`, `-`, `×`, `÷`)
- Clear current input or reset completely (AC)
- Display results instantly after pressing `=`
- Work on both desktop and mobile screens with responsive design

It’s a beginner-friendly project that helps understand:

- React **hooks** (`useState`)
- **Component-based architecture** (separating buttons, display, and logic)
- **Event handling** in React
- **Vite** for fast development and optimized builds

---

## 📂 Project Structure

```text
.
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── components/
│   │   └── Button.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js     # (if using Tailwind CSS)
└── postcss.config.js

If you used Tailwind CSS, you’ll also have: tailwindcss, postcss, autoprefixer.


🚀 Installation & Setup

Follow these steps to run the project locally:

1. Clone the Repository
git clone https://github.com/Sarfaraj32/Calculator-Project-With-React.git
cd Calculator-Project-With-React

2. Install Dependencies

Using npm:

npm install


Or using yarn:

yarn

3. Start Development Server
npm run dev


or

yarn dev


👉 By default, the app will be available at:

http://localhost:5173

4. Build for Production
npm run build


or

yarn build


This generates a dist/ folder with production-ready files.

5. Preview Production Build
npm run preview


or

yarn preview

🧩 How It Works

The app maintains state to store the current input, the previous value, and the selected operator.

When a digit or decimal is pressed, it appends to the current input.

When an operator is pressed, it moves the current input to “previous” and resets the current for next input.

Pressing = triggers evaluation between previous and current values using the chosen operator.

The Clear / All Clear buttons reset parts or all of the state.

Edge cases like dividing by zero, error display, or multiple decimals are handled.

You can extend this by adding:

Percent (%) operation

Negate (±) button

Keyboard support

History of calculations

📖 Example Usage

Press 5, +, 3, =

Output: 8

Press 9, ÷, 3, =

Output: 3

Press AC

Resets the calculator

🛠️ Scripts Available

npm run dev → Run app in development mode

npm run build → Create optimized production build

npm run preview → Preview production build locally

npm install → Install dependencies

✨ Features

✅ Clean and simple UI

✅ Fully responsive design

✅ Real-time results

✅ Reusable button components

✅ Lightweight and fast

🙋 Contributing

Contributions, suggestions, and bug reports are welcome!
If you’d like to improve this project:

Fork the repo

Create a new branch (git checkout -b feature-name)

Commit your changes (git commit -m "Added new feature")

Push to your branch (git push origin feature-name)

Open a Pull Request 🎉

🧪 Testing (Optional)

If you add tests (e.g. Jest / React Testing Library), you can run them with:

npm test


or

yarn test

📄 License

This project is licensed under the MIT License.
Feel free to use, modify, and distribute.

MIT © Md Sarfaraj Ahmed

👏 Acknowledgements

React

Vite

Tailwind CSS
 (if styling used)
