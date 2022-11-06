import { useEffect, useState } from 'react';
import axios from "axios";
import Post from './components/Post';
import './App.css';
import { Route, Routes } from 'react-router-dom';


const api = "http://localhost:9292/receipes"
function App() {

  const [post, setPost] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const response = await axios.get(api);
    setPost(response.data);
  };

  return (
    <div className="container-fluid">
      <NavBar />
      <Routes>
      </Routes>
    </div>
  );
}

export default App;
