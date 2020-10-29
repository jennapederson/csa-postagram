// src/App.js
import React, { useState, useEffect } from 'react';

// import API from Amplify library
import { API } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

// import query definition
import { listPosts } from './graphql/queries'

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div>
      <h1>Postagram</h1>
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.description}</p>
          </div>
        ))
      }
      <AmplifySignOut />
    </div>
  )
}

export default withAuthenticator(App)