import React, { useState } from "react";
import { Container, Row, Col, Figure, Form, Button } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import API from "../API";

const fileTypes = ["JPG", "PNG", "GIF"];

function Homepage(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [image, setImage]=useState(null)
  const [height, setHeight] = useState(600);
  const [width, setWidth] = useState(500);

  const { effects } = props;

  const handleChange = (file) => {
    setFile(file);
  };

  const saveFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await API.uploadImage(formData);
      // const res = await axios.post("http://localhost:3000/api/upload", formData );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
   
  };

  const showImage = async (e)=>{
    if(fileName)setImage(fileName)
  }


  return (
    <>
      <Container fluid>
        <div className="cont">
          <div className="drag">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              hoverTitle="Drop the image here"
              style={{ width: "500px" }}
            />
            <form onSubmit={uploadFile} encType="multipart/form-data" action="#">
              <input type="file" name="image" onChange={saveFile} />
              <button type="submit">Upload</button>
              <button onClick={showImage} >Show</button>
            </form>

            {(file !== null  && image !==null)  && (
              <>
                <ImageBox file={image} height={height} width={width} />
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
                <Row>
                  {effects.map((effect, index) => {
                    return (
                      <Col>
                        <Button>{effect.effect_name} </Button>
                      </Col>
                    );
                  })}
                </Row>
              </>
            )}
          </div>
        </div>
      </Container>
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
            width={600}
            height={900}
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
