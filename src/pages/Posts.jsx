import React, {useState, useEffect, useRef} from 'react';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/myModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import {getPageCount} from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


function Posts() {
  
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: '' })
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const LastElement = useRef();
 
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const changePage = (page) => {
    setPage(page);
  }

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  
  useObserver(LastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => setPosts(posts.filter(p => p.id !== post.id));

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: -1, name: 'Все посты'},
        ]}
      />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
         <div ref={LastElement} style={{height: 20, background: 'green'}}></div>
       {isPostsLoading &&
         <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
       }
       <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  );
}

export default Posts;
