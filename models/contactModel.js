const pool = require('../config/db');

// Find contacts matching email or phone
exports.findContactsByEmailOrPhone = async (email, phoneNumber) => {
  const [rows] = await pool.query(
    `SELECT * FROM Contact
     WHERE (email = ? OR phoneNumber = ?)
     AND deletedAt IS NULL`,
    [email, phoneNumber]
  );
  return rows;
};

// Insert a new contact
exports.createContact = async (contact) => {
  const { email, phoneNumber, linkedId, linkPrecedence } = contact;
  const [result] = await pool.query(
    `INSERT INTO Contact (email, phoneNumber, linkedId, linkPrecedence)
     VALUES (?, ?, ?, ?)`,
    [email, phoneNumber, linkedId, linkPrecedence]
  );
  return {
    id: result.insertId,
    ...contact,
  };
};
