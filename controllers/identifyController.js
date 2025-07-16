const Contact = require('../models/contactModel');

exports.handleIdentify = async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'Email or phoneNumber is required' });
  }

  try {
    const existingContacts = await Contact.findContactsByEmailOrPhone(email, phoneNumber);

    // No matches found
    if (existingContacts.length === 0) {
      const newContact = await Contact.createContact({
        email,
        phoneNumber,
        linkedId: null,
        linkPrecedence: 'primary',
      });

      return res.json({
        contact: {
          primaryContactId: newContact.id,
          emails: [email],
          phoneNumbers: [phoneNumber],
          secondaryContactIds: [],
        },
      });
    }

    // Get the oldest primary
    const primary = existingContacts.reduce((oldest, contact) => {
      if (contact.linkPrecedence === 'primary') {
        if (!oldest || new Date(contact.createdAt) < new Date(oldest.createdAt)) {
          return contact;
        }
      }
      return oldest;
    }, null);

    // If not already both values present, add new secondary
    const existingEmails = existingContacts.map(c => c.email);
    const existingPhones = existingContacts.map(c => c.phoneNumber);

    let newSecondary = null;
    if (!existingEmails.includes(email) || !existingPhones.includes(phoneNumber)) {
      newSecondary = await Contact.createContact({
        email,
        phoneNumber,
        linkedId: primary.id,
        linkPrecedence: 'secondary',
      });
    }

    // Combine all contacts
    const allContacts = [...existingContacts];
    if (newSecondary) {
      allContacts.push({
        id: newSecondary.id,
        email,
        phoneNumber,
        linkedId: primary.id,
        linkPrecedence: 'secondary'
      });
    }

    const emails = [...new Set(allContacts.map(c => c.email).filter(Boolean))];
    const phoneNumbers = [...new Set(allContacts.map(c => c.phoneNumber).filter(Boolean))];
    const secondaryContactIds = allContacts
      .filter(c => c.linkPrecedence === 'secondary')
      .map(c => c.id);

    return res.json({
      contact: {
        primaryContactId: primary.id,
        emails,
        phoneNumbers,
        secondaryContactIds,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
