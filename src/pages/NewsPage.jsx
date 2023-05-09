import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import NewsService from '../axios/NewsService';
import Comments from '../components/Comments';
import ItemListNews from '../components/ItemListNews';
import './NewsPage.css';

const NewsPage = () => {
    const [news, setNews] = useState();
    useEffect(() => {
        const url = window.location.pathname.split('/');
        NewsService.getOneNews(url[2]).then((res) => {
            setNews(res.data)
            console.log(res.data)
        });
    }, [])
    return (
        <Container fluid="md" className='mt-3 mb-3 '>
            <Card>
                <Card.Body>
                    <ItemListNews
                        news={news}
                        key={news !== undefined ? news.id : 1}
                        saitLink={news !== undefined ? news.url : undefined}
                        description={news !== undefined ? news.text : undefined}
                        commentsArray={news !== undefined ? news.descendants : undefined}
                    />
                    <div>
                        <h4>Comments:</h4>
                    </div>
                    <Comments comment={news} />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NewsPage;