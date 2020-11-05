/* eslint-disable no-unused-vars */
// eslint - disable react / jsx - no - undef;
import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post.js';
import { db } from './firebase.js';


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // run once when post refreshes
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()));
    })

  }, []); //run everytime the variable posts changes

  return (
    <div className="app">
      <div className="app__header" >
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram word" />
      </div>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} altTxt={post.altTxt} />
        ))
      }

    </div>
  );
}

export default App;
