package controllers.generator.data.models

import com.google.gson.annotations.Expose

// Модель для получения списка генераторов пользователем, содержит id, по которому будет
// отправляться запрос на получение конкретной задачи.
data class Generator(
        @Expose val id: Int,
        @Expose val title: String
)