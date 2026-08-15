const express = require('express');

const {
  createContact,
  getAdminContacts,
  getAdminContactById,
} = require('../controllers/contactController');

const router = express.Router();

router.post('/', createContact);

router.get('/admin', getAdminContacts);
router.get('/admin/:id', getAdminContactById);

module.exports = router;
