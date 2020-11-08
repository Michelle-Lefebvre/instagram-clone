import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import { db, storage } from './firebase.js';
import firebase from "firebase";
import './ImageUpload.css';

function ImageUpload({ username }) {
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
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        // progress bar
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // shows visual progress
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => { // complete function get image url & post in db
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image in db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        //  reset 
                        setProgress(0);
                        setCaption("")
                        setImage(null);
                    });
            }
        );
    };

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <Input className="imageupload__text" type="text" placeholder="Enter a caption..."
                onChange={event => setCaption(event.target.value)} value={caption} />
            <Input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>

        </div>
    )
}

export default ImageUpload
