import React, {useState, useMemo} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';


function App() {
  
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description test'},
    {id: 2, title: 'Java', body: 'Description text'},
    {id: 3, title: 'TypeScript', body: 'Description message'},
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const sortedPosts = useMemo(() => {
    console.log('Функция перерисовала')
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    } else {
      return posts;
    }
  }, [selectedSort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, sortedPosts]);

  const createPost = (newPost) => setPosts([...posts, newPost]);
  const removePost = (post) => setPosts(posts.filter(p => p.id !== post.id));

  const sortPosts = (sort) =>{
    setSelectedSort(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} 
          placeholder="Поиск..."
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка по"
          options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
          ]}
        />
      </div>
      {posts.length !== 0
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
        : <h1 style={{textAlign: 'center', marginTop: "20px"}}>
            Постов пока нет...
          </h1>
      }
    </div>
  );
}

export default App;
