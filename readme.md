# Sign-In with Ethereum Web Application

## Overview
This project implements a Sign-In with Ethereum (SIWE) web application using **React** with **TypeScript** for the frontend and **Express.js** for the backend. Users can connect their Ethereum wallet (e.g., MetaMask), sign a nonce to verify their identity, and toggle between light and dark themes. 

The app showcases how to integrate Web3 authentication along with a smooth user interface using **flexbox** and **CSS transitions**.

## Features
- **Connect to Web3 Wallet** (e.g., MetaMask)
- **Authenticate Using Ethereum Signature**:
  - Generate a nonce on the backend.
  - Sign the nonce on the frontend.
  - Verify the signed message on the backend.
- **Light/Dark Mode Toggle**:
  - Toggle button for switching between light and dark themes.
  - User's theme preference is stored in `localStorage` for persistence.
- **Responsive Design**:
  - Flexbox for seamless alignment and positioning.
  - CSS transitions for a polished UI experience.

## Technologies Used
### Frontend:
- **React** (with TypeScript)
- **Ethers.js** (Web3 interactions)
- **CSS Modules** (for scoped styling)
- **Flexbox & CSS Variables** (for styling)

### Backend:
- **Express.js**
- **Ethers.js** (for verifying Ethereum signatures)
- **CORS** (Cross-Origin Resource Sharing)


## Setup and Installation

### Prerequisites:
- **Node.js** (v12+)
- **MetaMask** or any other Ethereum wallet extension

### 1. Clone the Repository
```bash
git clone https://github.com/rakesh-baddipadaga/siginwithethereum.git
cd siwe-web-app

### 2.Install Dependencies


