const { Router } = require("express");
const router = Router();
const Contact = require("../../model/Contact");
const { User } = require("../../model/User");

router.post("/contact", (req, res) => {
  const contact = new Contact({
    full_name: req.body.full_name,
    phone_number: req.body.phone_number,
    relationship_status: req.body.relationship_status,
    email: req.body.email,
  });
  try {
    const newContact = contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
