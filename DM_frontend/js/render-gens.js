/**
 * Добавляет список генераторов в <select>
 * @param {array of objects} generators список генераторов, каждый содержит айди и название
 */
function renderGens(generators) {
    var select = document.getElementById('generators-select');

    for (var i = 0; i < generators.length; i++) {
        var option = document.createElement('option');
        option.textContent = generators[i].title;
        option.value = generators[i].id;
        select.appendChild(option);
    }
}

/**
 * Получает генераторы с сервера и отображает
 */
function getAndRenderGens() {
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