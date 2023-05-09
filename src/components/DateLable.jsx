import React, { useEffect, useState } from 'react';

const DateLable = ({ numberDate }) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [minutes, setMinutes] = useState('');
    const [hourse, setHourse] = useState('');

    useEffect(() => {
        function setParse(val) {
            if (val < 10)
                return '0' + val;
            return val;
        }
        if (numberDate !== undefined) {
            let date = new Date(numberDate * 1000);
            setMinutes(setParse(date.getMinutes()))
            setDay(setParse(date.getDay()));
            setYear(date.getFullYear());
            setMonth(setParse(date.getMonth()));
            setHourse(setParse(date.getHours()));
        }
    }, [numberDate])
    return (
        <>
            {day}.{month}.{year} {hourse}:{minutes}
        </>
    );
};

export default DateLable;