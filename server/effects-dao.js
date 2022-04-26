"use strict";

const db = require("./db");

//get all effects
exports.listAllEffects = () => {
  return new Promise(function (resolve, reject) {
    var query_str = "SELECT * FROM Effects ";
    db.query(query_str, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

// create new effect
exports.createEffect = (effect) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Effects(effect_id, effect_name, effect_description, effect_type) VALUES(?,?,?,?)";
    db.query(
      sql,
      [
        effect.effect_id,
        effect.effect_name,
        effect.effect_description,
        effect.effect_type,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        console.log(this.lastID);
        resolve(this.lastID);
      }
    );
  });
};

// delete effects
exports.deleteEffect = function (effectId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM Effects WHERE effect_id=?";
    db.query(sql, [effectId], (err) => {
      if (err) reject(err);
      else resolve(null);
    });
  });
};
