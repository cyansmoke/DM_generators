/**
 * Отображает условие и ответ задачи на странице
 * @param {object} solution содержит условие задачи problem и ответ к ней answer
 */
function renderSolution(solution) {
    var problem = document.getElementById('problem');
    while (problem.firstChild) problem.removeChild(problem.firstChild); // Delete old problem text
    var problemText = solution.problem.split('\n'); // Problem may consist of few string, we must show it correctly
    for (var i = 0; i < problemText.length; i++) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(problemText[i]) )
        problem.appendChild(p);
        updateMathJaxInElement(problem.lastChild);
    }

    var answer = document.getElementById('answer-text');
    while (answer.firstChild)  answer.removeChild(answer.firstChild); // Delete old answer
    answer.appendChild( document.createTextNode(solution.answer) ); // Add new
    updateMathJaxInElement(answer);
}

/**
 * Обновляет LaTeX формулы в DOM-элементе
 * @param {object} element DOM-элемент для изменения
 */
function updateMathJaxInElement(element) {
    MathJax.Hub.Queue( ['Typeset', MathJax.Hub, element] );
}

/**
 * Айди и сид последнего запроса, чтобы не обновлять его при одинаковых параметрах
 */
var lastParams = {
    id: 0,
    seed: 0
}

/**
 * Получает задачу с сервера и отображает
 */
function getAndRenderSolution() {
    showProgressBar();
    clearError();
    var button = document.getElementById('generate');
    button.disabled = true;
    var select = document.getElementById('generators');
    var id = +select[select.selectedIndex].value;

    // Show error if generator is not selected
    if (id == -1) {
        button.disabled = false;
        showError('Выберите генератор из списка');
        return;
    }

    // Show error if seed is too long
    var seed = +document.getElementById('seed-field').value;
    if (seed.toString().length > 12) {
        button.disabled = false;
        showError('Слишком длинный сид');
        return;
    } else if (!seed) {
        button.disabled = false;
        showError('Введите сид');
        return;
    }

    // Don't reload if last params equal current
    if (id == lastParams.id && seed == lastParams.seed) {
        button.disabled = false;
        hideProgressBar();
        return;
    } else {
        lastParams.id = id;
        lastParams.seed = seed;
    }

    getTask(id, seed, function(result) {
        if (result.status == 'ok') {
            renderSolution(result.solution);
            hideProgressBar();
            clearError();
            button.disabled = false;
        }
    })
}