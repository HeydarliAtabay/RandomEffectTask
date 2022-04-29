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
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  hoverTitle="Drop the image here"
                  style={{ width: "500px" }}
                />
                <form
                  onSubmit={uploadFile}
                  encType="multipart/form-data"
                  action="#"
                >
                  <input type="file" name="image" onChange={saveFile} />
                  {image ? (
                    <button type="submit">Apply</button>
                  ) : (
                    <button type="submit">Upload</button>
                  )}
                </form>
                <button onClick={showImage}>Show</button>

                {image && (
                  <ImageBox file={image} height={height} width={width} />
                )}
                <Row>
                  <Col sm={1}>Size</Col>
                  <Col sm={3}>
                    <Form.Control
                      type="number"
                      name="width"
                      value={width}
                      onChange={(ev) => setWidth(ev.target.value)}
                      autoFocus
                    />
                  </Col>{" "}
                  <Col sm={1}>x</Col>
                  <Col sm={3}>
                    <Form.Control
                      type="number"
                      name="height"
                      value={height}
                      onChange={(ev) => setHeight(ev.target.value)}
                      autoFocus
                    />
                  </Col>
                </Row>

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
  const { file, height, width } = props;

  return (
    <>
      <div className="imgbx">
        <Figure>
          <Figure.Image
            width={400}
            height={400}
            src={require(`../assets/${file}`)}
          />
          <Figure.Caption>
            {`${file} was uploaded, please select the filter or transmission`}
          </Figure.Caption>
        </Figure>
      </div>
    </>
  );
}

export default Homepage;
