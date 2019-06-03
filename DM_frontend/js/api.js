var BASE_URL = 'http://localhost:9000/';

/**
 * Возвращает полный url запроса и, если есть параметры для id и seed добавляет их в параметры запроса
 * @param {string} url  постфикс к базовому url 
 * @param {number} id   айди генератора задачи
 * @param {number} seed инициализатор ядра случайных чисел для генератора
 */
function getUrl(url, id, seed) {
    var result = BASE_URL + url;
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
 * @param {function} onError    функция для обработки ошибки 
 */
function fetchPost(url, onSuccess, onError) {
    fetch(url, { method: 'POST' })
        .then( function(response) {
            return response.json();
        })
        .then(onSuccess)
        .catch(onError);
}

/**
 * Отправляет запрос на получение генераторов
 * @param {function} onSuccess  каллбэк для обработки результата
 * @param {function} onError    функция для обработки ошибки 
 */
function getGenerators(onSuccess, onError) {
    return fetchPost(getUrl('get_generators'), onSuccess, onError);
}

/**
 * Отправляет запрос на получение конкретной задачи по id и seed
 * @param   {number}   id         айди генератора задачи
 * @param   {number}   seed       инициализатор ядра случайных чисел для генератора
 * @param {function}   onSuccess  каллбэк для обработки результата
 * @param {function}   onError    функция для обработки ошибки 
 */
function getTask(id, seed, onSuccess, onError) {
    return fetchPost(getUrl('get_task', id, seed), onSuccess, onError);
}