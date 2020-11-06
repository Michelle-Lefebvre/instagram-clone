/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';



function ImageUpload() {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    // function to take selected file and set it as the image
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {

    }

    return (
        <div>
            <Input type="text" placeholder="Enter a caption..." onchange={event => setCaption(event.target.value)} />
            <Input type="file" onChange={handleChange} />
            <Button onclick={handleUpload}>Upload</Button>

        </div>
    )
}

export default ImageUpload
