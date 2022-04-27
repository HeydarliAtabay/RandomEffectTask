import React, { useState } from "react";
import { Container, Row, Col, Figure, Form, Button } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import API from "../API";
import axios from 'axios'

const fileTypes = ["JPG", "PNG", "GIF"];

function Homepage(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [image, setImage]=useState(null)
  const [height, setHeight] = useState(600);
  const [width, setWidth] = useState(300);

  const { effects } = props;

  const handleChange = (file) => {
    setFile(file);
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
     const res= await API.uploadImage(formData)
   // const res = await axios.post("http://localhost:3000/api/upload", formData );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const showImage = async (e)=>{
    try{
      if(!image){
        const res = await API.getImage(2)
        setImage(res[0].image)
      }
      
    }catch(ex){
      console.log(ex)
    }
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
          <input type="file" name="image" onChange={saveFile} />
          <button onClick={uploadFile}>Upload</button>
          <button onClick={showImage}>Show</button>
            {(file !== null && image !==null)&& (
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
            width={parseInt(width)}
            height={parseInt(height)}
            src={require(`${file}`)}
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
