/**
 * Добавляет список генераторов в <select>
 * @param {array of objects} generators список генераторов, каждый содержит айди и название
 */
const renderGens = generators => {
    generators.forEach(gen => {
        var option = document.createElement('option');
        option.textContent = gen.title;
        option.value = gen.id;
        elements.gensSelect.appendChild(option);
    });
}

/**
 * Получает генераторы с сервера и отображает
 */
const getAndRenderGens = () => {
    getGenerators(
        function(result) {
            if (result.status === 'ok') {
                renderGens(result.generators);
            }
        },
        function(error) {
            setErrorState('Невозможно загрузить генераторы, проверьте соединение');
            console.log('Request failed, ' + error);
        }
    )
}

getAndRenderGens();