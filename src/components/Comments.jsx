import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import NewsService from '../axios/NewsService';
import DateLable from './DateLable';
import './ItemList.css';

const Comments = ({ comment }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if (comment !== undefined)
            if (comment.kids !== undefined) {
                comment.kids.forEach(id => {
                    let promise = new Promise((resolve, reject) => {
                        NewsService.getOneNews(id).then(res => { resolve(res.data); })
                    })
                    promise.then(value => {
                        setComments(prevState => [...prevState, value])
                    })
                });
            }
    }, [comment])
    function createMarkup(text) { return { __html: text }; };
    return (
        <>
            {comments.map(comment => (
                <ListGroup className='itemComment mb-2'>
                    <ListGroup.Item className="comment text-muted">
                        <u><pre>{comment.by}  <DateLable numberDate={comment !== undefined ? comment.time : undefined} /></pre></u>
                    </ListGroup.Item>
                    <ListGroup.Item className="comment text-muted">
                        <div dangerouslySetInnerHTML={createMarkup(comment.text)} />
                    </ListGroup.Item>
                    {comment.kids !== undefined ?
                        <ListGroup.Item className="comment text-muted">
                            <Comments comment={comment} />
                        </ListGroup.Item> : <></>}

                </ListGroup>
            ))}
        </>
    );
};

export default Comments;