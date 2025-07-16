# 🧠 Bitespeed Backend Task – Identity Reconciliation

This project implements a backend service for **identity reconciliation**, where contacts (email & phone numbers) are resolved and linked to a single user. The goal is to identify whether a given contact belongs to a new or existing user and manage the relationships accordingly.

---

## 📌 Problem Statement

Given an `email` and/or `phoneNumber`, the system should:
- Check if the contact already exists
- Identify the **primary contact**
- If new info is introduced, create a **secondary contact** and link it to the primary
- Return a unified object with all related contact data

> Task Reference: [Bitespeed Backend Task: Identity Reconciliation](https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-1fb21bb2a930802eb896d4409460375c)

---

## 🧰 Tech Stack

- **Backend:** Node.js + Express
- **Database:** MySQL
- **ORM/Driver:** mysql2 (using raw queries)
- **Environment Variables:** dotenv
- **API Tool:** Postman (for testing)

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
├── .env
└── README.md


---

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=bitespeed

🛠️ Setup Instructions
1. Clone the Repo


git clone https://github.com/<your-username>/bitespeed-identity-reconciliation.git
cd bitespeed-identity-reconciliation

2. Install Dependencies

npm install

3. Create the Database & Table
Login to MySQL Workbench or CLI and run:


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
Server will run at http://localhost:3000

🧪 API Usage
🔹 POST /identify
Request

{
  "email": "abc@example.com",
  "phoneNumber": "1234567890"
}
Response

{
  "contact": {
    "primaryContactId": 1,
    "emails": ["abc@example.com", "new@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2]
  }
}

✅ Logic Summary
If no matching email/phone → create as primary

If existing match → link as secondary

Always return consolidated result with:

primaryContactId

emails (deduplicated)

phoneNumbers (deduplicated)

secondaryContactIds

🙋 Author
Kiran Biradar
GitHub Profile
Final Year Software Engineer | Node.js & Full-Stack Developer
