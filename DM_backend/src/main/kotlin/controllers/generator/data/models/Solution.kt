package controllers.generator.data.models

import com.google.gson.annotations.Expose

// В этом виде пользователю будет возвращаться задача
data class Solution(
        @Expose var problem: String = "",
        @Expose var answer: String = ""
)