const contactModel = require('../models/contactModel');

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: 'name, email, subject and message are required',
      });
    }

    const contact = await contactModel.createContact(
      name,
      email,
      subject,
      message,
    );

    return res.status(201).json({
      message: 'message sent successfully',
      contact,
    });
  } catch (error) {
    console.error('create contact error:', error);

    return res.status(500).json({
      message: 'failed to send message',
    });
  }
};

const getAdminContacts = async (req, res) => {
  try {
    const contacts = await contactModel.getAllContacts();

    return res.json({
      contacts,
    });
  } catch (error) {
    console.error('get admin contacts error:', error);

    return res.status(500).json({
      message: 'failed to get contacts',
    });
  }
};

const getAdminContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await contactModel.getContactById(id);

    if (!contact) {
      return res.status(404).json({
        message: 'contact not found',
      });
    }

    return res.json({
      contact,
    });
  } catch (error) {
    console.error('get admin contact error:', error);

    return res.status(500).json({
      message: 'failed to get contact',
    });
  }
};

module.exports = {
  createContact,
  getAdminContacts,
  getAdminContactById,
};
