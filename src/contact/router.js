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

// async function getByEmail(email) {
//   return await Contact.findOne({
//     email
//   });
// }


// router.delete('/', async (req ,res)=>{
//         try {
//           const contact = await getByEmail({ id: req.query.id });
      
//           const deleteResult = await contact.remove();
      
//           return res.send("contact removed");
//         } catch (error) {
//           console.log(error);
//         }
//       })


async function getContacts() {
  return await Contact.find();
}

async function getById(id) {
  return await Contact.findById(id);
}
      

router.get('/', async (req, res)=> {
        try {
          console.log(req.query);
      
          if (req.query.id) {
            const id = req.query.id;
            const result = await getById(id);
            console.log(result);
            return res.send(result);
          }
      
          const result = await getContacts();
          console.log(result);
      
          return res.send(result);
        } catch (error) {
          console.log(error);
        }
      }
      )



module.exports = router;