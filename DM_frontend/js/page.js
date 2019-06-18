const elements = {
    mainContent:    document.getElementById('content'),

    gensSelect:     document.getElementById('generators-select'),
    seedField:      document.getElementById('seed-field'),
    generateBtn:    document.getElementById('generate-button'),
    errorText:      document.getElementById('error-message'),

    problemText:    document.getElementById('problem'),
    answerText:     document.getElementById('answer-text'),
    answerBtn:      document.getElementById('show-answer')
}


/**
 * Скрывает правую панель
 */
function setHiddenState() {
    elements.mainContent.setAttribute('state', 'hidden');
    elements.generateBtn.disabled = false;
}

/**
 * Показывает индикатор загрузки в правой панели, блокирует кнопку
 */
function setLoadingState() {
    elements.mainContent.setAttribute('state', 'loading');
    elements.generateBtn.disabled = true;
}

/**
 * Показывает задачу в правой панели
 */
function setReadyState() {
    elements.mainContent.setAttribute('state', 'ready');
    elements.generateBtn.disabled = false;
    elements.answerText.hidden = true;
}

/**
 * Выводит ошибку с заданным текстом, останавивает загрузку
 * @param {string} message текст ошибки для вывода 
 */
function setErrorState(message) {
    elements.mainContent.setAttribute('state', 'error');
    elements.generateBtn.disabled = false;
    elements.errorText.textContent = message;
}

function toggleAnswerState() {
    elements.answerText.hidden = !elements.answerText.hidden;
}

elements.answerBtn.addEventListener('click', toggleAnswerState);