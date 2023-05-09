import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component, React } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HOME_PAGE, NEWS_PAGE } from '../const/Consts';
import { Comments } from './Comments';
import { DateLable } from './DateLable';
import './ItemList.css';

export const ItemListNews = observer(class extends Component {
    news = [];
    link = undefined;
    text = undefined;
    comments = [];

    constructor(props) {
        super(props);
        makeObservable(this, {
            news: observable,
            link: observable,
            text: observable,
            comments: observable,
            goTo: action,
            createMarkup: action
        });
        this.link = this.props.saitLink;
        this.text = this.props.description;
        this.news = this.props.news;
        this.comments = this.props.commentsArray;
    }

    goTo = () => {
        window.location.href = this.link;
    }

    createMarkup = (text) => { return { __html: text }; };

    render() {
        return (
            <>

                <ListGroup className='item mb-2'>

                    <ListGroup.Item className="date text-muted">
                        <DateLable numberDate={this.news !== undefined ? this.news.time : undefined} />
                    </ListGroup.Item>
                    {this.link === undefined ?
                        <Link to={this.news !== undefined ? NEWS_PAGE + '/' + this.news.id : HOME_PAGE}>
                            <ListGroup.Item className='itemText'>
                                {this.news !== undefined ? this.news.title : ""}
                            </ListGroup.Item>
                        </Link>
                        :
                        <ListGroup.Item className='itemText' onClick={() => this.goTo()}>
                            {this.news !== undefined ? this.news.title : ""}
                        </ListGroup.Item>}

                    {this.text !== undefined ?
                        <ListGroup.Item className=" footer text-muted">
                            <div dangerouslySetInnerHTML={this.createMarkup(this.text)} />
                        </ListGroup.Item> : <></>}

                    <ListGroup.Item className=" footer text-muted">
                        Author:
                        <Badge pill bg="success" className='badge badgeAuthor'>
                            {this.news !== undefined ? this.news.by : ""}
                        </Badge>
                        Raitig:
                        <Badge bg="info" className='badge'>
                            {this.news !== undefined ? this.news.score : ""}
                        </Badge>
                        {this.comments !== undefined ?
                            <>Comments: <Badge bg="warning" className='badge'>{this.comments}</Badge> </>
                            : <></>}
                        {this.link !== undefined ?
                            <a href={this.link}>
                                <Badge className='badge'>Link</Badge>
                            </a> : <></>}
                    </ListGroup.Item>
                </ListGroup>
                {this.link === undefined ? <></> :
                    <>
                        <div>
                            <h4>Comments:</h4>
                        </div>
                        <Comments news={this.news} />
                    </>}

            </>
        )
    }
})
