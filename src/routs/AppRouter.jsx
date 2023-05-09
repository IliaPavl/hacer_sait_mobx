import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './Routs';
import { HOME_PAGE, NEWS_PAGE } from '../const/Consts';
import { observable } from 'mobx';

const myStore = observable({
    home_page: HOME_PAGE,
    news_page: NEWS_PAGE,
  });

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
        </Routes>
    );
};

export default AppRouter;