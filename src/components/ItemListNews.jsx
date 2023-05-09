import React, { useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NEWS_PAGE } from '../const/Consts';
import DateLable from './DateLable';
import './ItemList.css';

const ItemListNews = ({ news, saitLink, description, commentsArray }) => {
    const [link] = useState(saitLink);
    const [text] = useState(description);
    const [comments] = useState(commentsArray);
    const navigate = useNavigate();

    function goTo(id) {
        if (link === undefined)
            navigate(NEWS_PAGE + '/' + id);
        else
            window.location.href = link;
    }

    function createMarkup(text) { return { __html: text }; };


    return (
        <ListGroup className='item mb-2'>
            <ListGroup.Item className="date text-muted">
                <DateLable numberDate={news !== undefined ? news.time : undefined} />
            </ListGroup.Item>
            <ListGroup.Item className='itemText' onClick={() => goTo(news.id)}>
                {news !== undefined ? news.title : ""}
            </ListGroup.Item>

            {text !== undefined ?
                <ListGroup.Item className=" footer text-muted">
                    <div dangerouslySetInnerHTML={createMarkup(text)} />
                </ListGroup.Item> : <></>}

            <ListGroup.Item className=" footer text-muted">
                Author:
                <Badge pill bg="success" className='badge badgeAuthor'>
                    {news !== undefined ? news.by : ""}
                </Badge>
                Raitig:
                <Badge bg="info" className='badge'>
                    {news !== undefined ? news.score : ""}
                </Badge>
                {comments !== undefined ?
                    <>Comments: <Badge bg="warning" className='badge'>{comments}</Badge> </>
                    : <></>}
                {link !== undefined ?
                    <a href={link}>
                        <Badge className='badge'>Link</Badge>
                    </a> : <></>}
            </ListGroup.Item>
        </ListGroup>

    );
};

export default ItemListNews;