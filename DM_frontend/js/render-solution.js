/**
 * Отображает условие и ответ задачи на странице
 * @param {object} solution содержит условие задачи problem и ответ к ней answer
 */
const renderSolution = solution => {
     // Удаляем предыдущий текст задачи
    while (elements.problemText.firstChild) {
        elements.problemText.removeChild(problem.firstChild);
    } 

    // Если текст состоит из нескольких  строк, сосдаем несколько абзцев
    const problemText = solution.problem.split('\n');
    problemText.forEach(str => {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(str))
        problem.appendChild(p);
        updateMathJaxInElement(elements.problemText.lastChild);
    });

    elements.answerText.textContent = solution.answer;
    updateMathJaxInElement(elements.answerText);
}

/**
 * Обновляет LaTeX формулы в DOM-элементе
 * @param {object} element DOM-элемент для обновления
 */
const updateMathJaxInElement = element => {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
}

/**
 * Создаем функцию валидации, которая через замыкание хранит последние запросы
 */
const createValidate = () => {

    //Айди и сид последнего запроса, чтобы не повторять его при одинаковых параметрах
    let lastId = 0;
    let lastSeed = 0;

    return (id, seed) => {
        let isValid = true;

        // Три сценария для вывода ошибки пользователю
        const errorMessage =
            (id === -1) ? 'Выберите генератор из списка':
            (seed.toString().length > 12) ? 'Слишком длинный сид':
            (!seed) ? 'Введите сид' : '';


        if (errorMessage) {
            // Если есть текст ошибки, выводим ее
            setErrorState(errorMessage);
            isValid = false
        } else if (id === lastId && seed === lastSeed) {
            // Если текущие запросы равны предыдущим, то прерываем загрузку и оставляем предыдущую задачу
            setReadyState();
            isValid = false;
        }

        // Если валидация прошла успешно, записываем текущие параметры как предыдущие
        if (isValid) {
            lastId = id;
            lastSeed = seed;
        }

        return isValid;
    }
}

const validate = createValidate();

/**
 * Получает задачу с сервера и отображает
 */
const getAndRenderSolution = () => {
    setLoadingState();

    const select = elements.gensSelect;
    const id = select[select.selectedIndex].value;
    const seed = elements.seedField.value;

    if (!validate(id, seed)) return;
    
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

elements.generateBtn.addEventListener('click', getAndRenderSolution);