var express = require('express');
var app = express();

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'public');
app.set('view engine', 'html');


var posts = [
    {
        id: 1,
        title: "Help, my baby put his butt spatula in his mouth!",
        post: "My nanny was changing my son during this evening and I saw that he had his butt spatula in his mouth. Should I call his pedi?",
        comment: []
    }, 
    {
        id: 2,
        title: "My son rolled off the ottoman",
        post: "Hi, y'all! My son rolled off our ottoman, it was less than a 3 feet fall, what should I watch for?",
        comment: []
    }, 
    {
        id: 3,
        title: "My baby can pull the socket covers off",
        post: "Anyone know how to keep my baby from removing socket covers?",
        comment: []
    }
]

var idCount = 3;
var commentCount =1;

app.get('/api/posts', (req, res) => {
    res.json(posts)
})

app.post('/api/posts/new', (req, res) => {
    posts.push({title: req.body.title, post: req.body.post, comment: [], id: ++idCount})
    res.redirect('/');
})

app.get('/api/posts/:id', (req, res) => {
    var findPost = posts.find((element) => element.id === parseInt(req.params.id));
    res.render('comment', {
        locals: {
            findPost
        }
    })
})

app.post('/api/posts/:id/comment', (req, res) => {
    const {id} = req.params;
    var findPost = posts.find((element) => element.id === parseInt(req.params.id))
    findPost.comment.push({...req.body})
    // console.log(req.body)
    // console.log(findPost)
    res.redirect(`/api/posts/${id}`);
})

app.listen(port, function() {
    console.log('listening to port ' + port)
})