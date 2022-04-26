'use strict';

const express = require('express');
const app = new express();
const PORT = 3001;
const morgan = require('morgan');

const effectsDao = require('./effects-dao');

app.use(morgan('dev'))

app.use(express.json())

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session= require('express-session')

app.get('/',(req, res)=>{
    res.send(`Hi from the server, which is running on  http://localhost:${PORT}/`)
})

app.get('/api/effects', (req,res)=>{
    effectsDao.listAllEffects()
        .then((effects)=>{res.json(effects)})
        .catch((error)=>{res.status(500).json(error)} )
  })

app.post('/api/effects', (req,res) => {
    const effect = req.body;
    if(!effect){
        res.status(400).end();
    } else {
        effectsDao.createEffect(effect)
            .then((id) => res.status(201).json({"id" : id}))
            .catch((err) => res.status(500).json(err),
        );
    }
  });  

  app.delete("/api/effects/delete/:effectid", (req, res) => {
    const effectid = req.params.effectid;
    effectsDao
      .deleteEffect(effectid)
      .then((id) =>
        res
          .status(204)
          .json(
            `Selected effect with id:${effectid} was deleted`
          )
      )
      .catch((err) =>
        res
          .status(500)
          .json(
            `Error while deleting the effect with id:${req.params.effectid}  ` + err
          )
      );
  });

  // activate the server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });