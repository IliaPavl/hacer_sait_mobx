import { BY_ITEM, NEW_NEWS, USER, json_format } from '../const/Consts';
import Api from './Api'

function getNewNews() {
    return Api.get(NEW_NEWS);
}

function getOneNews(id) {
    return Api.get(BY_ITEM + '/' + id + json_format);
}

function getAuthor(nick) {
    return Api.get(USER + '/' + nick + json_format);
}

const NewsService = {
    getAuthor,
    getNewNews,
    getOneNews,
}
export default NewsService;