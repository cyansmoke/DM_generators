package controllers.generator

import com.google.gson.Gson
import controllers.generator.data.getSolution
import controllers.generator.data.models.Generator
import controllers.generator.responses.GeneratorsOkResponse
import controllers.generator.responses.SolutionErrorResponse
import controllers.generator.responses.SolutionOkResponse
import di.DaggerServerComponent
import spark.Spark
import javax.inject.Inject

class GeneratorController {

    init {
        DaggerServerComponent.create().inject(this)
    }

    @Inject
    lateinit var gson: Gson

    fun start() {
        initGetGeneratorsRequest()
        initGetTaskRequest()
    }

    private fun initGetGeneratorsRequest() {
        Spark.post("/get_generators", { _, _ ->
            return@post GeneratorsOkResponse(getGeneratorsFromFile())
        }, gson::toJson)
    }

    private fun initGetTaskRequest() {
        Spark.post("/get_task", { request, _ ->
            val id =
                request.queryParams("id")?.toInt() ?: return@post SolutionErrorResponse("No generator's ID parameter")

            val seed: Long =
                request.queryParams("seed")?.toLong() ?: return@post SolutionErrorResponse("No seed parameter")

            val solution =
                getSolution(id, seed) ?: return@post SolutionErrorResponse("Generator's ID not found")

            return@post SolutionOkResponse(solution)
        }, gson::toJson)
    }

    private fun getGeneratorsFromFile() = gson.fromJson(
        String::class.java.getResource("/generators.json").readText(),
        Array<Generator>::class.java
    ).toList()
}