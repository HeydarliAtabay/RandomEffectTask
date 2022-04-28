"use strict";
const express = require("express");
const app = new express();
const PORT = 3001;
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const db = require("./db");
const Jimp = require("jimp");
const multer = require("multer");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");

const effectsDao = require("./effects-dao");
const imagesDao = require("./image-dao");

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

    async function grayscale() {
      // Reading Image
      const image = await Jimp.read(uploadPath);
      image.greyscale()
        .write(uploadPath);
    }

    async function blur() {
      // Reading Image
      const image = await Jimp.read(uploadPath);
      image.blur(15)
        .write(uploadPath);
    }

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

/*app.post("/api/image", (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/upload/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    connection.query(
      'UPDATE user SET profile_image = ? WHERE id ="1"',
      [sampleFile.name],
      (err, rows) => {
        if (!err) {
          res.redirect("/");
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.use(express.static("files"));

app.post("/api/uploadaaa", (req, res) => {
    const newpath = __dirname + "/files/";
    const file = req.file;
    const filename = file.filename;
    file.mv(`${newpath}${filename}`, (err) =>{
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
      res.status(200).send({ message: "File Uploaded", code: 200 });
    });
  });
*/
// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
