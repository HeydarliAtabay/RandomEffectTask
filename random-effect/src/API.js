import { useEffect } from "react";

const url='http://localhost:3000'
/*APIs FOR Effects */

//Getting all effects
async function getallEffects(){

    const response=await fetch(`http://localhost:3000/api/effects`);
    if(response.ok){
      const responseBody=await response.json();
      return responseBody;
    }
     else{
         try {
           const err=await response.json();
           throw err.message;}
            catch(err){throw err;}
         }
     }

     function addImage(file) {
        return new Promise((resolve, reject) => {
          fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            //body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
            body : JSON.stringify({file})
            }).then((response) => {
              if (response.ok) {
                resolve(null);
              } else {
                // analyze the cause of error
                response.json()
                  .then((message) => { reject(message); }) // error message in the response body
                  .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
              }
          }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
        });
      }   
      
      
      async function uploadImage(formData,effect) {
        const response = await fetch(
          '/api/apply/'+effect,
          {
            method: 'POST',
            body: formData,
          }
        );
        if (response.ok) {
          return true;
        } else {
          let err = { status: response.status, errObj: await response.json() };
          throw err; // An object with the error coming from the server
        }
      }
 
    

      async function getImage(imageId) {
        let url1 = "/api/images/"+ imageId;
        const response = await fetch(url + url1);
        if(response.ok){
          const responseBody=await response.json();
          return responseBody;
        }
         else{
             try {
               const err=await response.json();
               throw err.message;}
                catch(err){throw err;}
             }
         }
     const API = { 
        getallEffects, addImage, uploadImage, getImage, applyFilterToImage
       };
export default API;     
