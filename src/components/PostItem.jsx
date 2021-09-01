import React from 'react';

const PostItem = (props) => {

  const {title, body} = props.post;

    return (
    <div className="post">
        <div className="post__content">
          <strong>{props.number}. {title}</strong>
          <div>
            {body}
          </div>
        </div>
        <div className="post__btns">
            <button>Удалить кнопку</button>
          </div>
      </div>
    );
};

export default PostItem;