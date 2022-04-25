import React from "react";
import {ReactNavbar} from "react-responsive-animate-navbar";
import Archive from'../Components/Archive';
import Homepage from '../Components/Homepage'

function Navigation(){
        return (
            <>
<div style={{ backgroundColor: "purple", minHeight: "13vh", width: "100%" }}>
<ReactNavbar
            menu={[
              { name: "HOME PAGE", to: "/", component: Homepage },
              { name: "ARCHIVE PAGE", to: "/archive", component: Archive },
            ]}
            social={[
              {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/atabay-heydarli/",
                icon: ["fab", "linkedin-in"],
              },
              {
                name: "Facebook",
                url: "https://www.facebook.com/AtabeyHeyderli",
                icon: ["fab", "facebook-f"],
              },
              {
                name: "Instagram",
                url: "https://www.instagram.com/atabeyheyderli/",
                icon: ["fab", "instagram"],
              },
              {
                name: "Twitter",
                url: "https://twitter.com/AtabayHeydarli",
                icon: ["fab", "twitter"],
              },
            ]}
            sticky
          />
            </div>
            </>
           
          
        );
      
    
    
}
 
export default Navigation