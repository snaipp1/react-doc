import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById();
        fetchComments();
    }, []);

    return (
        <div>
            <h1>Вы открыли страницу поста c ID = {id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id} . {post.title}</div>
            }
            <h2> Комментарии:</h2>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                       <div style={{marginTop: 15}} key={comm.id}>
                           <h5>{comm.email}</h5>
                           <div>{comm.body}</div>
                       </div>  
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;