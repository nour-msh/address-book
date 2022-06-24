const express= require ("express")
const app = express()
const port= 3000
app.use(express.json());
const mongoose= require ("mongoose");
mongoose.connect('mongodb+srv://nour-msh:nouna123@addressbookdb.y4ul6o7.mongodb.net/?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connection Successful!");
});



app.listen(port, ()=>console.log(`listening on port ${port}`))