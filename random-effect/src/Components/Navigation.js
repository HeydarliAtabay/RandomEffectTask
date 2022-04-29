import React from "react";
import { ReactNavbar } from "react-responsive-animate-navbar";
import { Navbar, Nav, Form } from "react-bootstrap/";
import { PersonCircle, ClipboardData } from "react-bootstrap-icons";



  
  function Navigation(props) {
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        {/* <Navbar.Toggle aria-controls="left-sidebar" onClick={this.showSidebar}/> */}
        <Navbar.Toggle aria-controls="left-sidebar" />
        <Navbar.Brand href="/">
          <ClipboardData className="mr-1" size="30" />Random Effects
        </Navbar.Brand>
        <Form
          inline
          className="my-0 mx-auto"
          action="#"
          role="search"
          aria-label="Quick search"
        >
        </Form>
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link onClick={props.logout} href={props.link}> {props.info}
              <PersonCircle size="30" />
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
