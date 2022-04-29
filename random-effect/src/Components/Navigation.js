import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap/";
import { PersonCircle, BrightnessAltHighFill } from "react-bootstrap-icons";



  
  function Navigation(props) {
    const {loggedIn}=props
    return (
      <Navbar className="color-nav" variant="dark" fixed="top">
        {/* <Navbar.Toggle aria-controls="left-sidebar" onClick={this.showSidebar}/> */}
        <Navbar.Toggle aria-controls="left-sidebar" />
        <Navbar.Brand href="/">
          <BrightnessAltHighFill className="color-nav-text" size="30" /> <span className="color-nav-text">Random Effects</span>
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



  