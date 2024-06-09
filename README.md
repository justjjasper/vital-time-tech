# Vital Time Tech - Technical Test

## Overview
This project is a technical test for Vital Time Tech, built using Next.js and Tailwind CSS. It is deployed on an AWS EC2 Ubuntu instance and utilizes a responsive web design. The backend is hosted with Node.js and Express, retrieving data from MongoDB. The Next.js Fetch API is used to fetch and update data.
<img width="1296" alt="Screen Shot 2024-06-08 at 11 12 38 PM" src="https://github.com/justjjasper/vital-time-tech/assets/98243819/fd73bec1-58b8-4f7b-a91a-79f3c116afa8">

## Technologies Used
- **Next.js**: A React framework for server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **AWS EC2 (Ubuntu)**: A cloud computing service for deploying applications.
- **Node.js & Express**: Backend JavaScript runtime and web application framework.
- **MongoDB**: A NoSQL database for storing and retrieving data.

## Features
- **List is Draggable**: Able to see the list item being dragged.
- **Responsive Web Design**: Ensures the application is usable on all devices.
- **Next.js Fetch API**: Used for data fetching and updating.

## Installation

### Prerequisites
- Node.js
- MongoDB
- AWS EC2 Instance (Ubuntu)

### Clone the Repository
```bash
git clone https://github.com/justjjasper/vital-time-tech.git
cd vital-time-tech
```

### Install Node Packages
```bash
npm install
```

### Start the Client and Server with PM2 Start
```bash
npm run pm2-start
```

### To Stop the Client/Server
```bash
npm run pm2-stop
```
