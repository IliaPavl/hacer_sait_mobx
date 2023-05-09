import { HOME_PAGE, NEWS_PAGE } from "../const/Consts";
import HomePage from "../pages/HomePage";
import NewsPage from "../pages/NewsPage";

export const publicRoutes = [
    {
        path: HOME_PAGE,
        Component: HomePage
    },
    {
        path: NEWS_PAGE + "/:id_news",
        Component: NewsPage
    },
]