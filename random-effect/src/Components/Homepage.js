import React, { useState } from "react";
import { Container, Row,Col } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";


const fileTypes = ["JPG", "PNG", "GIF"];

function Homepage(props) {

  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
  };
  return (
<>
<div className="cont">

<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
{(file !==null)&& <ImageBox file={file.name} />}

</div>

</>

  );
  }


  function ImageBox(props){
    const {file}=props
    return(
      <>
      <div className="imgbx">
      <img src={require(`../assets/${file}`)} alt="uploaded" height="300" width="300"></img>
      </div>
      </>
    )
  }
  
  export default Homepage;
  