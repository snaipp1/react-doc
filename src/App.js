import React, {useState} from 'react';
import PostList from './components/PostList';
import './styles/App.css';


function App() {
  
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'Java', body: 'Description'},
    {id: 3, title: 'TypeScript', body: 'Description'},
  ]);

  return (
    <div className="App">
      <PostList posts={posts} title="Список постов"/>
    </div>
  );
}

export default App;
