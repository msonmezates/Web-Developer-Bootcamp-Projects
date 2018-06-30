const bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mongoose = require('mongoose'),
express = require('express'),
app = express();

// App Config
app.set('view engine', 'ejs');
app.use(express.static('public')); // this is necessary for custom stylesheet
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // this middleware helps to override POST method as PUT or DELETE

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

// RESTFUL ROUTES

app.get('/',(req,res) => {
  res.redirect('/blogs'); //redirect to '/blogs' route by default
});
// INDEX route
app.get('/blogs',(req,res) => {
  Blog.find({}, (err, blogs) => {
    if(err) console.log(err);
    else {
      res.render('index',{ blogs });
    }
  });
});
// NEW route
app.get('/blogs/new', (req,res) => {
  res.render('new');
});
// CREATE route
app.post('/blogs', (req,res) => {
  // create the blog and redirect
  const { blog } = req.body;
  Blog.create(blog, (err, blog) => {
    if(err) console.log(err);
    else res.redirect('/blogs');
  });
});
// SHOW route
app.get('/blogs/:id',(req,res) => {
  const { id } = req.params; //this id comes from the url
  Blog.findById(id,(err, foundBlog) => {
    if(err) console.log(err);
    else {
      res.render('blogDetail', { blog: foundBlog });
    }
  });
});
// EDIT route
app.get('/blogs/:id/edit',(req,res) => {
  const { id } = req.params;
  Blog.findById(id, (err, foundBlog) => {
    if(err) console.log(err);
    else res.render('edit', { blog: foundBlog });
  });
});
// UPDATE route
app.put('/blogs/:id',(req,res) => {
  const { id } = req.params;
  const { blog } = req.body;
  Blog.findByIdAndUpdate(id, blog, (err, updatedBlog) => {
    if(err) console.log(err);
    else res.redirect('/blogs/' + id);
  });
});
// DELETE route
app.delete('/blogs/:id', (req,res) => {
  const { id } = req.params;
  const { blog } = req.body;
  Blog.findByIdAndRemove(id, (err => { // since I don't have any data, I don't have to pass in anything else 
    if(err) console.log(err);
    else res.redirect('/blogs');
  }))
});

app.listen(process.env.PORT || 3000, ()=> console.log('Blog server has started...'));



