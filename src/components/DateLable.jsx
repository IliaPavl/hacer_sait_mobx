import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

export const DateLable = observer(class extends Component {
    day = '';
    month = '';
    year = '';
    hourse = '';
    minutes = '';
    number = 0;

    constructor(props) {
        super(props);
        makeObservable(this, {
            day: observable,
            month: observable,
            year: observable,
            hourse: observable,
            minutes: observable,
            number: observable,
            set: action
        });
        this.number = this.props.numberDate ?? 0;
        this.set();
    }
    setParse = (val) => {
        if (val < 10)
            return '0' + val;
        return val;
    }
    set = () => {
        if (this.number !== 0) {
            let date = new Date(this.number * 1000);
            this.minutes = (this.setParse(date.getMinutes()))
            this.day = (this.setParse(date.getDay()));
            this.year = (date.getFullYear());
            this.month = (this.setParse(date.getMonth()));
            this.hourse = (this.setParse(date.getHours()));
        }
    }
    render() {
        return (
            <>
                {this.day}.{this.month}.{this.year} {this.hourse}:{this.minutes}
            </>
        );
    }
})
