const { Router } = require('express');
const Contact = require("../../model/Contact");
const { User } = require("../../model/User");
const router = Router();

router.post("/", async (req, res) => {
  const contact = new Contact({
    full_name: req.body.full_name,
    phone_number: req.body.phone_number,
    relationship_status: req.body.relationship_status,
    email: req.body.email,
  });
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/', async (req ,res)=>{
        try {
          const contact = await Contact.findOne({ _id: req.query.id });
      
          const deleteResult = await contact.remove();
      
          await User.updateMany({ _id: contact.users }, { $pull: { contacts: contact._id } });
      
          return res.send("contact removed");
        } catch (error) {
          console.log(error);
        }
      })



module.exports = router;