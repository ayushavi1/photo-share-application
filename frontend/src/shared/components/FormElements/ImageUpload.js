import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const inputFileRef = useRef();

    useEffect(() => {
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImagePreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file]);

  const imagePickHandler = () => {
    inputFileRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
        fileIsValid = true;
    } else {
      setIsValid(false);
        fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className='form-control'>
      <input
        id={props.id}
        ref={inputFileRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {imagePreviewUrl && <img src={imagePreviewUrl} alt='Preview' />}
          {!imagePreviewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type='button' onClick={imagePickHandler}>
          PICK IMAGE
        </Button>
      </div>
        {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
