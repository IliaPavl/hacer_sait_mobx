import { HOME_PAGE, NEWS_PAGE } from "../const/Consts";
import { HomePageMobx } from "../pages/HomePageMobx";
import { NewsPageMobx } from "../pages/NewsPageMobx";

export const publicRoutes = [
    {
        path: HOME_PAGE,
        Component: HomePageMobx
    },
    {
        path: NEWS_PAGE + "/:id_news",
        Component: NewsPageMobx
    },
]