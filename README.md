# 🧠 Bitespeed Backend Task – Identity Reconciliation

This project implements a backend service for **identity reconciliation**, where email and phone number records are matched, deduplicated, and linked logically to a single user. It helps consolidate fragmented contact data into a unified representation.

---

## 📌 Problem Statement

Given a combination of `email` and/or `phoneNumber`, the system should:

- Determine whether the contact already exists
- Identify the oldest record as the **primary contact**
- Link other records as **secondary contacts**
- Return a response containing:
  - The primary contact ID
  - A deduplicated list of emails
  - A deduplicated list of phone numbers
  - A list of all secondary contact IDs

---

## 🧰 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Driver/ORM:** mysql2
- **Environment Management:** dotenv
- **Testing Tool:** Postman

---

## 📁 Project Structure

bitespeed-identity-reconciliation/
├── app.js
├── config/
│ └── db.js
├── controllers/
│ └── identifyController.js
├── models/
│ └── contactModel.js
├── routes/
│ └── identify.js
├── .env.example
├── package.json
└── README.md

##🛠️ Setup Instructions

1. Clone the Repo

git clone https://github.com/Kiran-Biradar27/bitespeed-identity-reconciliation.git
cd bitespeed-identity-reconciliation

2. Install Dependencies
npm install

3. Configure Database
Open MySQL CLI or MySQL Workbench and run the following SQL to set up the Contact table:

CREATE DATABASE bitespeed;
USE bitespeed;

CREATE TABLE Contact (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phoneNumber VARCHAR(20),
  email VARCHAR(255),
  linkedId INT DEFAULT NULL,
  linkPrecedence ENUM('primary', 'secondary') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL
);

4. Run the Server
node app.js
Server will run at:
➡️ http://localhost:3000

---
