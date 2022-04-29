import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Figure,
  Form,
  Button,
  Carousel,
} from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import API from "../API";


const fileTypes = ["JPG", "PNG", "GIF"];

function Homepage(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState(400);
  const [effect, setEffect] = useState("Flip");

  const { effects, loggedIn } = props;

  const handleChange = (file) => {
    setFile(file);
  };

  const saveFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    if (fileName) setImage(fileName);
    e.preventDefault();
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    try {
      const res = await API.uploadImage(formData, effect);
      // const res = await axios.post("http://localhost:3000/api/upload", formData );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const showImage = async (e) => {
    if (fileName) setImage(fileName);
  };

  return (
    <>
        <div className="cont">
          <div className="drag">
            {loggedIn && (
              <>
                <form
                  onSubmit={uploadFile}
                  encType="multipart/form-data"
                  action="#"
                >
                  <input  type="file" name="image" onChange={saveFile} />
                  <button className="btnsimple" type="submit">Apply</button>
                  
                </form>
                

                
                 {image ? <ImageBox style={{marginTop:"5px"}} file={image} height={height} width={width} /> : <ImageBox /> } 
                 <button className="btnsimple" onClick={showImage}>Show</button>
               

                <Form>
                  <Row>
                    <Col sm={4}>
                      <Form.Label>Select the effect</Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        as="select"
                        value={effect}
                        onChange={(ev) => {
                          setEffect(ev.target.value);
                        }}
                      >
                        {[...effects].map((effect, index) => {
                          return <option>{effect.effect_name}</option>;
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                </Form>
              </>
            )}

            {!loggedIn && (
              <>
           <div className="carCont">
                  <Carousel fade>
                    <Carousel.Item interval={10000}>
                      <img
                        className="d-block w-100"
                        src={require("../slideimages/slide1.jpg")}
                        alt="First slide"
                      />
                      <Carousel.Caption  className="carousel-custom-background">
                        <h3>Change color of Images</h3>
                        <p>
                          Here you can invert, sepia or grayscale the images
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                      <img
                        className="d-block w-100"
                        src={require("../slideimages/slide2.jpg")}
                        alt="Second slide"
                      />
                      <Carousel.Caption  className="carousel-custom-background">
                        <h3>Blur images</h3>
                        <p>You can easily blur your images</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                  <button className="btnlog" onclick="window.location.href='/login';" type="button" >Login for trying this filters and effects</button>
            </div>
              </>
            )}
          </div>
        </div>
    </>
  );
}

function ImageBox(props) {
  const { file } = props;

  return (
    <>
      <div className="imgbx">
        {file ? (
          <>
 <Figure>
          <Figure.Image
            width={380}
            height={380}
            src={require(`../assets/${file}`)}
            className="rounded mb-0"
          />
          <Figure.Caption>
          <span style={{color:"white"}}> {`${file} was uploaded, please select the filter or transmission`} </span>
          </Figure.Caption>
        </Figure>
          </>
        )
          :(
            <>
<Figure>
          <Figure.Image
            width={380}
            height={380}
            src={require(`../slideimages/noImage.jpg`)}
          />
          <Figure.Caption style={{color:"white"}}>
       <span style={{color:"white"}}> No image was uploaded, please upload the image to continue </span> 
          </Figure.Caption>
        </Figure>
            </>
          )
         
        }
       
      </div>
    </>
  );
}

export default Homepage;
