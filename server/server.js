"use strict";
const express = require("express");
const app = new express();
const PORT = 3001;
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const db = require("./db");
const Jimp = require("jimp");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");

const effectsDao = require("./effects-dao");
const imagesDao = require("./image-dao");
const usersDao = require("./user-dao")

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session= require('express-session')


app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    `Hi from the server, which is running on  http://localhost:${PORT}/`
  );
});

// for user authentication

passport.use(new LocalStrategy(
  function(username, password, done) {
    usersDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    }).catch(err=>{
        done(err)
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  usersDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// checking whether the user is authenticated or not
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: 'not authenticated'});
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'Ondan ona ondan ona, cay verun limonnan ona',
  resave: false,
  saveUninitialized: false 
}));

// tell passport to use session cookies
app.use(passport.initialize())
app.use(passport.session())


app.post("/api/apply/:effect", (req, res) => {
  let effect=req.params.effect
  let uploadPath;
  console.log(req.files);
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  if (!req.files) {
    console.log("No file upload ");
  } else {
    const file = req.files.file;
    let newPath = path.resolve("../random-effect/");
    uploadPath = newPath + "/src/assets/" + file.name;
    file.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);

      var insertData =
        "INSERT INTO Images(image, image_name, user_id)VALUES(?,?,?)";
      db.query(insertData, [file.name, "photo", 1], (err, result) => {
        if (err) throw err;
        else {
          console.log("file uploaded");
        }
      });
    });

if(effect==="Flip") {
  flip();
  console.log("Image is fliped")
}

if(effect==="ChangeColor"){
  invert()
  console.log("The color of image was changed")
}

if(effect==="Tilt"){

  console.log("image was tilted")
}
if(effect==="InvertColor"){
  invert();
  console.log("image color was inverted")
}
if(effect==="GrayScale"){
  grayscale()
  console.log("image was changed to grayscale")
}
if(effect==="Blur"){
  blur()
  console.log("image was blurred")
}

if(effect==="Sepia"){
  sepia()
  console.log("image was changed to sepia")
}
// function for flipping the image
    async function flip() {
      // Reading Image
      const image = await Jimp.read(uploadPath);
      image
        .flip(true, true, function (err) {
          if (err) throw err;
        })
        .write(uploadPath);
    }
//function for inverting the colors of image
    async function invert() {
      // Reading Image
      const image = await Jimp.read(uploadPath);
      image.invert()
        .write(uploadPath);
    }
// function to changing image to grayscale
    async function grayscale() {
      // Reading Image
      const image = await Jimp.read(uploadPath);
      image.greyscale()
        .write(uploadPath);
    }
// making photo blurred
    async function blur() {
      // Reading Image
      const image = await Jimp.read(uploadPath);
      image.blur(15)
        .write(uploadPath);
    }
// making photo in sepia
    async function sepia() {
      // Reading Image
      const image = await Jimp.read(uploadPath);
      image.sepia()
        .write(uploadPath);
    }
  }
});

app.post("/api/apply/:effectName", (req, res) => {
  console.log(req.files);
  // let effectName=req.params.effectName
  console.log(`Selected Effect is hello`);
});
////////////////////Images///////////////////////////

app.get("/api/images/:imageId", (req, res) => {
  const imageId = req.params.imageId;
  imagesDao
    .listImage(imageId)
    .then((questions) => {
      res.json(questions);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

/////////////////// Effects///////////////////////////////////
app.get("/api/effects", (req, res) => {
  effectsDao
    .listAllEffects()
    .then((effects) => {
      res.json(effects);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.post("/api/effects", (req, res) => {
  const effect = req.body;
  if (!effect) {
    res.status(400).end();
  } else {
    effectsDao
      .createEffect(effect)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) => res.status(500).json(err));
  }
});

app.delete("/api/effects/delete/:effectid", (req, res) => {
  const effectid = req.params.effectid;
  effectsDao
    .deleteEffect(effectid)
    .then((id) =>
      res.status(204).json(` Selected effect with id:${effectid} was deleted`)
    )
    .catch((err) =>
      res
        .status(500)
        .json(
          `Error while deleting the effect with id:${req.params.effectid}   ` +
            err
        )
    );
});


/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});


// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});


// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
