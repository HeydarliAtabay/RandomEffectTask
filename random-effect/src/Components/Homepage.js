import React, { useState } from "react";
import { Container, Row,Col, Figure, Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";


const fileTypes = ["JPG", "PNG", "GIF"];

function Homepage(props) {

  const [file, setFile] = useState(null);
  const [height, setHeight] = useState(600);
  const [width, setWidth] = useState(300);

  const {effects}=props

  const handleChange = (file) => {
    setFile(file);
  };
  return (
<>
<Container fluid>
<div className="cont">

<div className="drag"><FileUploader handleChange={handleChange} name="file" types={fileTypes}  hoverTitle="Drop the image here" style={{width:"500px"}} />
{(file !==null)&&
<>
<ImageBox file={file.name} height={height} width={width} />
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
  </Col> <Col sm={1}>x</Col>
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
<p>{effects[0].effect_name}</p>
</>
}
</div>
</div>
</Container>
</>
  );
  }


  function ImageBox(props){
    const {file, height, width}=props
    return(
      <>
      <div className="imgbx">
<Figure>
  <Figure.Image
    width={parseInt(width)}
    height={parseInt(height)}
    src={require(`../assets/${file}`)}
  />
    <Figure.Caption>
      {`${file} was uploaded, please select the filter or transmission`}
    </Figure.Caption>
</Figure>
      </div>
      </>
    )
  }
  
  export default Homepage;
  