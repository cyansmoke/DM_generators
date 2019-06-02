/**
 * Устанавливает выравнивае элементов по центру и отображает загрузку
 */
function showProgressBar() {
    document.getElementById('progress-bar').style.display = 'block';
    document.getElementById('results').style.alignItems = 'center';
    document.getElementById('solution').style.display = 'none';
}

/**
 * Устаанавливает выравнивает по левой стороне и скрывает загрузку
 */
function hideProgressBar() {
    hideAnswer();
    document.getElementById('progress-bar').style.display = 'none';
    document.getElementById('results').style.alignItems = 'flex-start';
    document.getElementById('solution').style.display = 'flex';
    document.getElementById('solution').style.flexDirection = 'column';
}

/**
 * Если ответ отображается, то скрыть и наоборот
 */
function showOrHideAnswer() {
    var answer = document.getElementById('answer-text');
    if (answer.style.display == 'inline') {
        hideAnswer();
    } else {
        showAnswer();
    }
}

function showAnswer() {
    var answer = document.getElementById('answer-text');
    answer.style.display = 'inline';
}

function hideAnswer() {
    var answer = document.getElementById('answer-text');
    answer.style.display = 'none';
}

/**
 * Выводит ошибку с заданным текстом, останавивает показ загрузки
 * @param {string} message текст ошибки для вывода 
 */
function showError(message) {
    document.getElementById('progress-bar').style.display = 'none';
    var errorMessage = document.getElementById('error-message');
    clearError();
    errorMessage.style.display = 'inline';
    errorMessage.appendChild( document.createTextNode(message) ); // Add new
}

/**
 * Очищает поле ошибки
 */
function clearError() {
    var errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    while (errorMessage.firstChild) errorMessage.removeChild(errorMessage.firstChild);
}