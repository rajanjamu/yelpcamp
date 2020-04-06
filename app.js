const express       = require('express'),
      app           = express(),
      mongoose      = require('mongoose'),
      bodyParser    = require('body-parser');

mongoose.connect('mongodb://localhost/yelpcamp_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
});
const Campground = mongoose.model("Campground", campgroundSchema);


app.listen(3000, () => console.log('Yelpcamp is running on port 3000!'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// let campgrounds = [
//     {name: "Horizon", image: "https://live.staticflickr.com/1319/564620771_c7f7b82712_c.jpg"},
//     {name: "Mountains", image: "http://live.staticflickr.com/65535/49722472552_0804d6849a_z.jpg"},
//     {name: "Lakes", image: "http://live.staticflickr.com/4217/35207374452_6cb8544f38_z.jpg"},
//     {name: "Valleys", image: "http://live.staticflickr.com/65535/49664819958_6be99f1344_z.jpg"},
//     {name: "Park", image: "http://live.staticflickr.com/7455/27179679744_6484cf15dc_c.jpg"},
//     {name: "Rivers", image: "http://live.staticflickr.com/5557/31156634466_d8c0445398_z.jpg"}
// ];

// Campground.create(campgrounds, (err, campground) => {
//     if (err) console.log(err);
//     else console.log(campground);
// });

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) console.log(err);
        else res.render('campgrounds', { campgrounds: allCampgrounds });
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};

    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) console.log(err);
        else res.redirect('/campgrounds');
    });
});