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

