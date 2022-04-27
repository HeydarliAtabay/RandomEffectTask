"use strict";

const db = require("./db");

//get all effects
exports.listAllImages = () => {
  return new Promise(function (resolve, reject) {
    var query_str = "SELECT * FROM Images ";
    db.query(query_str, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

exports.listImage = (imageId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Images WHERE image_id=?';
      db.query(sql, [imageId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const images = rows.map((image) => ({ 
            image_id: image.image_id,
            image: image.image,
            image_name: image.image_name,
            user_id: image.user_id,  }));
            resolve(images);
      });
    });
  };