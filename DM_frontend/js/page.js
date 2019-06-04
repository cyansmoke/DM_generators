/**
 * Скрывает правую панель
 */
function setHiddenState() {
    document.getElementById('content').setAttribute('state', 'hidden');
    document.getElementById('generate-button').disabled = false;
}

/**
 * Показывает индикатор загрузки в правой панели, блокирует кнопку
 */
function setLoadingState() {
    document.getElementById('content').setAttribute('state', 'loading');
    document.getElementById('generate-button').disabled = true;
}

/**
 * Показывает задачу в правой панели
 */
function setReadyState() {
    document.getElementById('content').setAttribute('state', 'ready');
    document.getElementById('generate-button').disabled = false;
}

/**
 * Выводит ошибку с заданным текстом, останавивает загрузку
 * @param {string} message текст ошибки для вывода 
 */
function setErrorState(message) {
    document.getElementById('content').setAttribute('state', 'error');
    document.getElementById('generate-button').disabled = false;
    document.getElementById('error-message').textContent = message;
}

function showOrHideAnswer() {
    var answer = document.getElementById('answer-text');
    answer.hidden = !answer.hidden;
}