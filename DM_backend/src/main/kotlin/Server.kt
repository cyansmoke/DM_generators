import controllers.generator.GeneratorController
import spark.Spark.port

lateinit var path: String //переменная для передачи пути до папки с генераторами

fun main(args: Array<String>) {
    path = "src/main/resources/generators/"
    port(9000)
    GeneratorController().start()
}