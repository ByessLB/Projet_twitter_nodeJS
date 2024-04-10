const express = require ("express");
const session = require ("express-session");
const cookieParser = require ("cookie-parser");
const bodyParser = require ("body-parser");

const app = express();
const port = 8088;

const mime = require('mime-types');


// Middleware express
/*************************************************************************/

app.use (bodyParser.urlencoded({extended : true}));
app.use (express.json());
app.use (express.static("public"));

// Template
/**************************************************************************/

app.set ("views", __dirname + "/views");
app.set ("view engine", "ejs");

// Init cookie SESSION
/****************************************************************************/

app.use (cookieParser());
app.use (
    session({
        secret : "Mon cul c'est du poulet!",
        saveUninitialized : true,
        resave : false,
    })
);

// Router
/****************************************************************************/

const indexRouter = require ("./controller/index");
const userRouter = require ("./controller/user");
const tweetRouter = require ("./controller/tweet");
const commentRouter = require ("./controller/comment");
const likeRouter = require ("./controller/like");
const retweetRouter = require ("./controller/retweet");
const followRouter = require ("./controller/follow");

// Routing
/****************************************************************************/

app.use ('/', indexRouter);
app.use ('/', userRouter);
app.use ('/', tweetRouter);
app.use ('/', commentRouter);
app.use ('/', likeRouter);
app.use ('/', retweetRouter);
app.use ('/', followRouter);


// Gestionnaire d'erreurs
/****************************************************************************/

app.use ((err, req, res, next) => {
    if (err.status === 404) {
        res.render ("./error/404");
    } else {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === "development" ? err : {};
        res.status (err.status || 500);
        res.render ('./error/error');
    }
});

// Listener
/****************************************************************************/

app.listen(port, () => console.log ("Ecoute sur le port : 8088"));