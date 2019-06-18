const BASE_URL = 'http://localhost:9000/';

/**
* Возвращает полный url запроса и, если есть параметры для id и seed добавляет их в параметры запроса
* @param {string} url  постфикс к базовому url 
* @param {string} id   айди генератора задачи
* @param {string} seed инициализатор ядра случайных чисел для генератора
*/
const getUrl = (url, id, seed) => {
    let result = BASE_URL + url;
    if (id != undefined && seed != undefined) {
        return result + `?id=${id}&seed=${seed}`;
    } else {
        return result;
    }
}

/**
* Отправляет пост-запрос на url и обрабатывает результат в переданном callback
* @param {string}   url        адрес запроса 
* @param {function} onSuccess  каллбэк для обработки результата
* @param {function} onError    каллбэк для обработки ошибки 
*/
const fetchPost = (url, onSuccess, onError) => {
       fetch(url, { method: 'POST' })
           .then(function(response) {
               return response.json();
           })
           .then(onSuccess)
           .catch(onError);
}

/**
 * Отправляет запрос на получение генераторов
 * @param {function} onSuccess  каллбэк для обработки результата
 * @param {function} onError    каллбэк для обработки ошибки 
 */
const getGenerators = (onSuccess, onError) => {
    return fetchPost(getUrl('get_generators'), onSuccess, onError);
}

/**
 * Отправляет запрос на получение конкретной задачи по id и seed
 * @param   {string}   id         айди генератора задачи
 * @param   {string}   seed       инициализатор ядра случайных чисел для генератора
 * @param {function}   onSuccess  каллбэк для обработки результата
 * @param {function}   onError    каллбэк для обработки ошибки 
 */
const getTask = (id, seed, onSuccess, onError) => {
    return fetchPost(getUrl('get_task', id, seed), onSuccess, onError);
}






