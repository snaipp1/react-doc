import React from 'react';
import MyButton from './UI/button/MyButton';
import { useHistory } from 'react-router-dom';

const PostItem = (props) => {
const router = useHistory();

  const {title, body} = props.post;

    return (
    <div className="post">
        <div className="post__content">
          <strong>{props.post.id}. {title}</strong>
          <div>
            {body}
          </div>
        </div>
        <div className="post__btns">
            <MyButton onClick={() => router.push(`/posts/${props.post.id}`)} style={{marginRight: '5px'}}>
              Открыть
            </MyButton>
            <MyButton onClick={() => props.remove(props.post)} style={{marginRight: '5px'}}>
              Удалить
            </MyButton>
        </div>
      </div>
    );
};

export default PostItem;