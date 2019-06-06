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
        p.appendChild(document.createTextNode(problemText[i]))
        problem.appendChild(p);
        updateMathJaxInElement(problem.lastChild);
    }

    var answer = document.getElementById('answer-text');
    answer.textContent = solution.answer;
    updateMathJaxInElement(answer);
}

/**
 * Обновляет LaTeX формулы в DOM-элементе
 * @param {object} element DOM-элемент для обновления
 */
function updateMathJaxInElement(element) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
}

/**
 * Айди и сид последнего запроса, чтобы не обновлять его при одинаковых параметрах
 */
var lastParams = {
    id: 0,
    seed: 0
}

function validate(id, seed) {
    if (id === -1) {
        setErrorState('Выберите генератор из списка');
        return false;
    }
    if (seed.toString().length > 12) {
        setErrorState('Слишком длинный сид');
        return false;
    }
    if (!seed) {
        setErrorState('Введите сид');
        return false;
    }
    if (id === lastParams.id && seed === lastParams.seed) {
        setReadyState();
        return false;
    }
    return true;
}

/**
 * Получает задачу с сервера и отображает
 */
function getAndRenderSolution() {
    setLoadingState();

    var select = document.getElementById('generators-select');
    var id = +select[select.selectedIndex].value;
    var seed = +document.getElementById('seed-field').value;

    if (!validate(id, seed)) return;

    lastParams.id = id;
    lastParams.seed = seed;

    getTask(id, seed,
        function(result) {
            if (result.status === 'ok') {
                renderSolution(result.solution);
                setReadyState();
            }
        },
        function(error) {
            setErrorState('Невозможно загрузить задачу, проверьте соединение');
            console.log('Request failed, ' + error);
        }
    )
}