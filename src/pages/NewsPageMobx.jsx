import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
import NewsService from '../axios/NewsService';
import { ItemListNews } from '../components/ItemListNews';


export const NewsPageMobx = observer(class extends Component {
    news = {};

    constructor(props) {
        super(props);
        makeObservable(this, {
            news: observable,
            set: action.bound
        });
        this.set();
    }
    set = () => {
        const url = window.location.pathname.split('/');
        NewsService.getOneNews(url[2]).then((res) => {
            this.news = res.data;
        });
    }
    render() {
        return (
            <Container fluid="md" className='mt-3 mb-3 '>
                <Card>
                    <Card.Body>
                        <ItemListNews
                            news={this.news}
                            key={this.news !== undefined ? this.news.id : 1}
                            saitLink={this.news !== undefined ? this.news.url : undefined}
                            description={this.news !== undefined ? this.news.text : undefined}
                            commentsArray={this.news !== undefined ? this.news.descendants : undefined}
                        />
                    </Card.Body>
                </Card>
            </Container>
        );
    }
})
