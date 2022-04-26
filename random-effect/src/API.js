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


     const API = { 
        getallEffects
       };
export default API;     
