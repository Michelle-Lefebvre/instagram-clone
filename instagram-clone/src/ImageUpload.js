/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { storage, db } from "./firebase";

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
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
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
                        // reset
                        setProgress(0);
                        setCaption("")
                        setImage(null);
                    });
            }
        );
    };

    return (
        <div>
            <progress value={progress} max="100" />
            <input type="text" placeholder="Enter a caption..." onchange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button onclick={handleUpload}>Upload</Button>

        </div>
    )
}

export default ImageUpload
