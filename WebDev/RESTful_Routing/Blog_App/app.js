const bodyParser = require('body-parser'),
mongoose = require('mongoose'),
express = require('express'),
app = express();

// App Config
app.set('view engine', 'ejs');
app.use(express.static('public')); // this is necessary for custom stylesheet
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/blog');

// Mongoose Model Config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  createdAt: { type: Date, default: Date.now } //this is how we assign default values
});

const Blog = mongoose.model('Blog', blogSchema);

// Test DB
// Blog.create({
//   title: 'Test',
//   image: 'https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&h=350',
//   body: 'This is the test body'
// });

// RESTful Routes
app.get('/',(req,res) => {
  res.redirect('/blogs'); //redirect to '/blogs' route by default
});

app.get('/blogs',(req,res) => {
  Blog.find({}, (err, blogs) => {
    if(err) console.log(err);
    else {
      res.render('index',{ blogs });
    }
  });
});


app.listen(process.env.PORT || 3000, ()=> console.log('Blog server has started...'));



