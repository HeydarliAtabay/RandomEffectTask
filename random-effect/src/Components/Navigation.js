import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap/";
import { PersonCircle, ClipboardData } from "react-bootstrap-icons";



  
  function Navigation(props) {
    const {loggedIn}=props
    return (
      <Navbar className="color-nav" variant="dark" fixed="top">
        {/* <Navbar.Toggle aria-controls="left-sidebar" onClick={this.showSidebar}/> */}
        <Navbar.Toggle aria-controls="left-sidebar" />
        <Navbar.Brand href="/">
          <ClipboardData className="color-nav-text" size="30" /> <span className="color-nav-text">Random Effects</span>
        </Navbar.Brand>
        <Form
          inline
          className="my-0 mx-auto"
          action="#"
          role="search"
          aria-label="Quick search"
        >
        </Form>
       
     {loggedIn && (
       <>
        <Nav>
       <Nav.Link href="/homepage"> <span style={{color:"white", fontSize:18}}>Home Page</span> </Nav.Link>
      <Nav.Link eventKey={2} href="/archive"><span style={{color:"white", fontSize:18}}>Archive Page</span> </Nav.Link>
      </Nav>
       </>
     )}
      
    
        <Nav >
          <Nav.Item>
            
            <Nav.Link  onClick={props.logout} href={props.link}> <span className="color-nav-text"> {props.info}</span>
              <PersonCircle color="#F64C72" size="30" />
            </Nav.Link>

          </Nav.Item>
        </Nav>
      </Navbar>
    )
  }

  export default Navigation;



  /*const {loginStatus} = props
  return (
    <>
      <div
        style={{ backgroundColor: "purple", minHeight: "13vh", width: "100%" }}
      >
        <ReactNavbar
          menu={[
            { name: "HOME PAGE", to: "/", component: Homepage },
            { name: "ARCHIVE PAGE", to: "/archive", component: Archive },
            { name: "LOGIN PAGE", to :"/login", component: LoginComponent  }
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
} */
