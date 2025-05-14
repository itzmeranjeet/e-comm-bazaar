#E-comm Bazaar

A modern e-commerce product detail page built with React, featuring user authentication using Firebase and a dynamic cart system sync with Firestore.

##Project Description
-Browse products
-View product details
-Register/login using Firebase Authentication
-Add items to cart (only for logged-in users)
-Automatically save and retrieve cart items using Firestore

It is designed to practice frontend development skills with a focus on authentication, state management, and real-time data persistence.

##Setup Instructions

#1. Clone the repo
-bash
git clone https://github.com/your-username/ecomm-bazaar.git
cd ecomm-bazaar

#2. Install dependencies
npm install

#3. Setup Firebase
-Create a Firebase project at https://console.firebase.google.com
-Enable Email/Password sign-in method
-Enable Firestore Database
-Get your Firebase config object and create a file:
--src/firebase/firebase.js

#4Start the development server
-npm run dev

#Features Implements
-Responsive design with TailwindCSS
-Search bar
=Modular components (ProductCard, CartDrawer, Navbar, etc.)
-Firebase authentication (Register, Login, Logout)
-Protected cart functionality (only for logged-in users)
-Cart state using useReducer + Context API
-Cart sync to Firestore (persisted across logins)

#Technologies Used
-React
-TailwindCSS
-Sonner(for toast popup)
-React Router DOM
-Firebase (Auth + Firestore)
-Context API + useReducer
