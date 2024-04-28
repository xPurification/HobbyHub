import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ViewPost from './pages/ViewPost';
import { Link } from 'react-router-dom'


const App = () => {
  
  const posts = []

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/post/:id",
      element: <ViewPost data={posts}/>
    }
  ]);

  return (
    <div className="App">
        <div className="header">
            <h1>HobbyHub</h1>
            <div>
                <Link to="/"><button className="headerBtn">Home</button></Link>
                <Link to="/new"><button className="headerBtn">Create New Post</button></Link>
            </div>
        </div>
        {element}
    </div>
);
}

export default App;