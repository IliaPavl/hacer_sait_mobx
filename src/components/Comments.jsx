import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import NewsService from '../axios/NewsService';
import { DateLable } from './DateLable';

export const Comments = observer(class extends Component {
    news = {};
    comments = [];

    constructor(props) {
        super(props);
        makeObservable(this, {
            news: observable,
            comments: observable,
            set: action.bound,
            getValues: action,
            createMarkup: action
        });
        this.news = props.news;
        this.news = this.props.news;
        this.getValues(this.news);
    }

    getValues = (comment) => {
        if (comment !== undefined)
            if (comment.kids !== undefined) {
                comment.kids.forEach(id => {
                    let promise = new Promise((resolve, reject) => {
                        NewsService.getOneNews(id).then(res => { resolve(res.data); })
                    })
                    promise.then(value => {
                        this.set(value);
                    })
                });
            }
    }

    set = (value) => {
        let val = this.comments;
        val.push(value);
        this.comments = val;
    }
    createMarkup(text) { return { __html: text }; };

    render() {
        return (
            <>
                {this.comments.map(comment => (
                    <ListGroup className='itemComment mb-2' key={comment.id}>
                        <ListGroup.Item className="comment text-muted">
                            <u><pre>{comment.by}  <DateLable numberDate={comment !== undefined ? comment.time : undefined} /></pre></u>
                        </ListGroup.Item>
                        <ListGroup.Item className="comment text-muted">
                            <div dangerouslySetInnerHTML={this.createMarkup(comment.text)} />
                        </ListGroup.Item>
                        {comment.kids !== undefined ?
                            <ListGroup.Item className="comment text-muted">
                                <Comments news={comment} />
                            </ListGroup.Item> : <></>}

                    </ListGroup>
                ))}
            </>
        );
    }
})
