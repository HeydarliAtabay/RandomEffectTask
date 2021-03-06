import React, { useState } from "react";
import { Row, Col, Figure, Form, Carousel } from "react-bootstrap";
import API from "../API";
import { useHistory } from "react-router-dom";

function Homepage(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);
  const [effect, setEffect] = useState("Flip");

  const { effects, loggedIn } = props;
  const history = useHistory()

  // saving file in a state of app
  const saveFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    if (fileName) setImage(fileName);
    e.preventDefault();
  };
  // uploading file to db and applying selected effect
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    try {
      const res = await API.uploadImage(formData, effect);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  // showing image after applying an effect
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
                <input
                  type="file"
                  name="image"
                  onChange={saveFile}
                  accept="image/png, image/gif, image/jpeg"
                />
                {file ? (
                  <button className="btnsimple" type="submit">
                    Apply
                  </button>
                ) : (
                  <button
                    title="you should upload image first"
                    className="btnsimple"
                    type="submit"
                    disabled
                  >
                    Apply
                  </button>
                )}
              </form>

              <Form style={{ marginBottom: "15px" }}>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Select the effect</Form.Label>
                  </Col>
                  <Col sm={7}>
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

              {image ? (
                <ImageBox style={{ marginTop: "5px" }} file={image} />
              ) : (
                <ImageBox />
              )}
              <button className="btnsimple" onClick={showImage}>
                Show
              </button>
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
                    <Carousel.Caption className="carousel-custom-background">
                      <h3>Change color of Images</h3>
                      <p>Here you can invert, sepia or grayscale the images</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={10000}>
                    <img
                      className="d-block w-100"
                      src={require("../slideimages/slide2.jpg")}
                      alt="Second slide"
                    />
                    <Carousel.Caption className="carousel-custom-background">
                      <h3>Blur images</h3>
                      <p>You can easily blur your images</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                <button
                  className="btnlog"
                  onClick={()=>{history.push("/login")}}
                  type="button"
                >
                  Login for trying this filters and effects
                </button>
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
                <span style={{ color: "white" }}>
                  {" "}
                  {`${file} was uploaded, please select the filter or transmission`}{" "}
                </span>
              </Figure.Caption>
            </Figure>
          </>
        ) : (
          <>
            <Figure>
              <Figure.Image
                width={380}
                height={380}
                src={require(`../slideimages/noImage.jpg`)}
              />
              <Figure.Caption style={{ color: "white" }}>
                <span style={{ color: "white" }}>
                  {" "}
                  No image was uploaded, please upload the image to continue{" "}
                </span>
              </Figure.Caption>
            </Figure>
          </>
        )}
      </div>
    </>
  );
}

export default Homepage;
