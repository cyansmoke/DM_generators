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

    var errorMessage = document.getElementById('error-message');
    while (errorMessage.firstChild) errorMessage.removeChild(errorMessage.firstChild);
    errorMessage.appendChild( document.createTextNode(message) ); // Add new
}

function showOrHideAnswer() {
    var answer = document.getElementById('answer-text');
    if (answer.style.display == 'inline') {
        hideAnswer();
    } else {
        showAnswer();
    }
}

function showAnswer() {
    document.getElementById('answer-text').style.display = 'inline';
}

function hideAnswer() {
    document.getElementById('answer-text').style.display = 'none';
}