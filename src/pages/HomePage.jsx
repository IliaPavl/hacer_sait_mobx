import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import NewsService from '../axios/NewsService';
import ItemListNews from '../components/ItemListNews';
import Image from '../images/refresh.png';
import './NewsPage.css';

const HomePage = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState([]);
    const [buferPage, setBuferPage] = useState([]);
    const [allId, setAllId] = useState([]);
    const [fetch, setFetch] = useState(false);

    const scroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150)
            setFetch(true);
    }

    function getNewNews() {
        NewsService.getNewNews().then((response) => {
            setAllId(response.data.slice(0, 100))
            setPage(response.data.slice(0, 20))
            setBuferPage(response.data.slice(0, 20))
        })
    }

    function refresh() {
        setNews([]);
        getNewNews();
    }

    useEffect(() => {
        document.addEventListener('scroll', scroll);
        return function () {
            document.removeEventListener('scroll', scroll);
        }
    }, [])

    useEffect(() => {
        if (fetch) {
            setBuferPage(allId.splice(page.length, page.length + 1));
            setPage(prevState => [...prevState, allId.splice(page.length, page.length + 1)])
            setFetch(false);
        }
    }, [fetch,allId,page])

    useEffect(() => {
        getNewNews();
    }, [])

    useEffect(() => {
        async function getBufer() {
            buferPage.forEach(id => {
                let promise = new Promise((resolve, reject) => {
                    NewsService.getOneNews(id).then(res => { resolve(res.data); })
                })
                promise.then(val => {
                    setNews(prevState => [...prevState, val])
                })
            });
        }
        getBufer();
    }, [buferPage])

    return (
        <Container fluid="md" className='mt-3 mb-3 newsCard'>
            <Card>
                <Card.Header className='newsHeader d-flex flex-row-reverse' >
                    <div className='imgRefreshDiv' onClick={() => refresh()}>
                        <img className='imgRefresh' src={Image} alt='refresh' />
                    </div>
                </Card.Header>
                <Card.Body>
                    {news.map(item => (
                        <ItemListNews news={item} key={item.id} />
                    ))}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default HomePage;