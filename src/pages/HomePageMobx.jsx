import { action, autorun, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
import NewsService from '../axios/NewsService';
import { ItemListNews } from '../components/ItemListNews';
import Image from '../images/refresh.png';
import './NewsPage.css';
export const HomePageMobx = observer(class extends Component {
    news = [];
    page = [];
    buferPage = [];
    allId = [];
    fetch = false;

    constructor(props) {
        super(props);
        makeObservable(this, {
            news: observable,
            page: observable,
            buferPage: observable,
            allId: observable,
            fetch: observable,
            scroll: action,
            getNewNews: action,
            refresh: action,
            isFetch: action,
            setNews: action.bound,
            addEventListner: action
        });
        autorun(() => this.getNewNews());
        autorun(() => this.addEventListner());
        autorun(() => this.isFetch(this.fetch, this.allId, this.page));
        autorun(() => this.getBufer(this.buferPage));
    }

    addEventListner = () => {
        document.addEventListener('scroll', this.scroll);
    }
    removeEventListner = () => {
        document.removeEventListener('scroll', this.scroll);
    }

    getBufer = (buferPage) => {
        buferPage.forEach(id => {
            let promise = new Promise((resolve, reject) => {
                NewsService.getOneNews(id).then(res => { resolve(res.data); })
            })
            promise.then(val => {
                this.setNews(val)
            })
        });
    }

    setNews = (val) => {
        let news = this.news;
        news.push(val);
        this.news = news;
    }
    isFetch = (fetch, allId, page) => {
        if (fetch) {
            this.buferPage = allId.splice(page.length, page.length + 1);
            const val = this.page;
            val.push(allId.splice(page.length, page.length + 1));
            this.page = val;
            this.fetch = false;
        }
    }
    scroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150)
            this.fetch = true;
    }
    getNewNews = () => {
        NewsService.getNewNews().then((response) => {
            this.allId = response.data.slice(0, 100);
            this.page = response.data.slice(0, 20);
            this.buferPage = response.data.slice(0, 20);
        })
    }

    refresh = () => {
        this.news = [];
        this.getNewNews();
    }

    render() {
        return (
            <Container fluid="md" className='mt-3 mb-3 newsCard'>
                <Card>
                    <Card.Header className='newsHeader d-flex flex-row-reverse' >
                        <div className='imgRefreshDiv' onClick={() => this.refresh()}>
                            <img className='imgRefresh' src={Image} alt='refresh' />
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {this.news.map(item => (
                            <ItemListNews news={item} key={item.id} />
                        ))}
                    </Card.Body>
                </Card>
            </Container>
        );
    }
})
