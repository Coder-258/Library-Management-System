const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/library');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Connected to MongoDB');
})
const books=db.collection('books');
const bookSchema = new mongoose.Schema({
        title: {type:String,unique:true},
        author: String,
        genre: String,
        year: Number,
        description: String,
        imageUrl: String,  // Add this field for the book image
        isIssued: { type: Boolean, default: false },
        issuedTo: {type:String},
});
const Book = mongoose.model('Book', bookSchema);
const booksCollection = ([{
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    genre: "Investment",
    year: 1949,
    description: "Considered a classic in the world of investing, this book offers timeless wisdom on value investing and managing risks in the stock market.",
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP.U5eeSP1drhb5kyQ4sxysWQHaJQ&pid=Api&P=0&h=150"
},
{
    title: "The Wealthy Gardener",
    author: "John Soforic",
    genre: "Personal Finance",
    year: 2019,
    description: "This book uses a fictional narrative to impart valuable financial lessons on creating wealth and achieving financial independence.",
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.yW8H2Ek2zU7BbB-8al1njwHaHY&pid=Api&P=0&h=150"
},
{
    title: "Your Money or Your Life",
    author: "Vicki Robin and Joe Dominguez",
    genre: "Personal Finance",
    year: 1992,
    description: "A groundbreaking book that offers a nine-step program to transform your relationship with money and achieve financial independence.",
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.Hp_xTQvpE2Fqq1SaulsNNgHaD4&pid=Api&P=0&h=150"
},
{
    title: "Financial Peace",
    author: "Dave Ramsey",
    genre: "Personal Finance",
    year: 1992,
    description: "Dave Ramsey's guide to personal finance, providing practical advice on budgeting, eliminating debt, and building wealth.",
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP._TpMZlPJzAIzhpJaH59FKQHaHa&pid=Api&P=0&h=150"
},
{
    title: "Unshakeable",
    author: "Tony Robbins",
    genre: "Investment",
    year: 2017,
    description: "Provides advice on how to remain financially secure and take advantage of market opportunities, with insights on investing and financial planning.",
    imageUrl: "https://tse4.mm.bing.net/th?id=OIP.3CSGZh06keDnPPJmEUnf0gHaEM&pid=Api&P=0&h=150"
},
{
    title: "Broke Millennial",
    author: "Erin Lowry",
    genre: "Personal Finance",
    year: 2017,
    description: "A modern guide to personal finance for millennials, offering practical tips on budgeting, saving, and investing in a relatable manner.",
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP.FImI1BngvdQzsCO-O6ZVjAHaLH&pid=Api&P=0&h=150"
},
{
    title: "The Simple Path to Wealth",
    author: "JL Collins",
    genre: "Personal Finance",
    year: 2016,
    description: "A straightforward guide to financial independence and investing, focusing on simplicity and long-term wealth building through index funds.",
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.WMpicDNrYgERiGaCLOwu9wHaJ5&pid=Api&P=0&h=150"
},
{
    title: "Financial Freedom",
    author: "Grant Sabatier",
    genre: "Personal Finance",
    year: 2019,
    description: "A comprehensive guide to achieving financial independence at a young age, offering practical advice on saving, investing, and growing wealth rapidly.",
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.E-X19gJ2-fwSm0my53PJAgHaD4&pid=Api&P=0&h=150"
},
{
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    genre: "Non-Fiction",
    year: 1997,
    description: "A guide to financial education and personal finance, comparing the financial philosophies of the author's two 'dads' to show the difference between asset-building and debt-accumulating mindsets.",
    imageUrl: "https://i.etsystatic.com/43954823/r/il/ef169c/5370604635/il_1140xN.5370604635_3im5.jpg"
},
{
    title: "The Psychology of Money",
   author: "Morgan Housel",
    genre: "Non-Fiction",
     year : 2020,
    description: "Explores the behavioral aspects of personal finance and investing, offering insights into how emotions and psychology affect financial decisions.",
    imageUrl: "https://rokingz.com/wp-content/uploads/2021/07/The-Psychology-of-Money.jpg"
},
{
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Non-Fiction",
    year: 2018,
    description: "Offers a practical guide to forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results.",
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP.6GF7ohLMUfEYzuo8seQGFwHaEs&pid=Api&P=0&h=180"
}
]);
async function initializeBooks() {
    try {
      const count = await Book.countDocuments();
      if (count === 0) {
        await Book.insertMany(booksCollection);
        console.log('Books initialized in the database');
      } else {
        console.log('Books already exist in the database');
      }
    } catch (err) {
      console.log('Error initializing books:', err);
    }
  }
  // Call this function when your server starts
  initializeBooks();
module.exports=Book;