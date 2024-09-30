const http=require('http');
const express = require('express');
const session=require('express-session');
const app = express();
const path=require('path');
const port=3000;
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Book=require('./models/booksDb.js');
const User = require('./models/db.js');
mongoose.connect('mongodb://127.0.0.1:27017/library');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log("We are connected");
})
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,              // Don't save session if unmodified
    saveUninitialized: false,    // Save a session that is new but not modified
    cookie: { secure: false }   // Use 'true' if using HTTPS
}));
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/dashboard",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","dashboard.html"));
}) 
app.get('/bookInfo', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.render('bookInfo', { books }); // Render the EJS view, passing the books
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
app.get("/returnInfo", async (req, res) => {
    let emailID = req.session.email;
    try {
        let user = await User.findOne({ email: emailID }).populate('issuedBooks');
        if (user && user.issuedBooks) {
            res.render("return", { returnBooks: user.issuedBooks });
        } else {
            res.render("return", { returnBooks: [] });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("An error occurred");
    }
});
app.post("/returnBook/:returnBookId", async (req, res) => {
    const returnBookId = req.params.returnBookId;
    const userEmail = req.session.email;
    
    try {
        let book = await Book.findOne({_id: returnBookId, isIssued: true, issuedTo: userEmail});
        let user = await User.findOne({email: userEmail});
        
        if (book && user) {
            // Update the book
            await Book.updateOne({_id: returnBookId}, {$set: {isIssued: false, issuedTo: null}});
            
            // Remove the book from user's issuedBooks
            user.issuedBooks = user.issuedBooks.filter(issuedBook => issuedBook.toString() !== returnBookId);
            await user.save();
            
            res.redirect("/returnInfo");
        } else {
            res.status(404).send("Book not found or not issued to you");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while processing your request");
    }
});
app.listen(port,()=>{
    console.log(`server is running on port http://127.0.0.1:${port}`)
})
app.get("/successfullyIssued",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","issued.html"))
})
app.get("/alreadyIssued",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","alreadyIssued.html"))
})
app.post('/issueBook/:bookid', async (req,res)=>{
    console.log(req.params.bookid)
    const bookId=req.params.bookid;
    const emailid=req.session.email;
    console.log(emailid);
    console.log(bookId);
    try{
      const book=  await Book.findById(req.params.bookid);
      const user= await User.findOne({email:emailid})
      if(book && user){
        if(book.isIssued){
           res.redirect("/alreadyIssued")
        }
        else{
            await Book.updateOne({_id:bookId},{$set:{isIssued:true,issuedTo:emailid}});
             user.issuedBooks.push(book);
            await user.save();
                console.log("Book issued to: "+emailid);
                res.redirect("/successfullyIssued")
                // res.json({message:"Book issued successfully"});
        } 
        } 
      }
    catch(e){
        console.log(e);
    }
})
app.post("/logIn", async (req,res)=>{
    const email=req.body.email;
    let password=req.body.password;
    try{
        const user = await User.findOne({email});
        console.log(user.password);
        const validPassword=await bcrypt.compareSync(password,user.password)
        if(user && validPassword){
                console.log("Login Successful");
                req.session.email=email;
                console.log(req.session.email)
                res.redirect("/dashboard");
            }else if(user && !validPassword){
                console.log("Invalid Password");
            }
            else{
                console.log('User does not exist.Create Account First');
                res.redirect("/");
            }
       }   
    catch(err){
        console.log(err);
    }
})
app.post("/signIn", async (req,res)=>{
     const email=req.body.email;
     let password=req.body.password;
     const cPassword=req.body.cPassword;
     try{
        const user = await User.findOne({email});
        if(user){
            console.log("user already exists");
            res.redirect("/");
        }
        else{
            if(password===cPassword){
                password= await bcrypt.hashSync(password,5)
                 const user=new User({email,password})
                 await user.save();
                 console.log("new user created");
                 res.redirect("/dashboard");
             }
             else{
                 console.log("Passwords do not match");
             }
        }
        
     }catch(err){
        console.log(err)
     }
})
