package controllers.generator.data

import controllers.generator.data.models.Solution
import path
import java.io.BufferedReader
import java.io.InputStreamReader

//чтобы добавить новый генератор сначала требуется добавить title и id в файл generators.json в папке resources
// затем обработать его генерацию здесь

// command - команда для запуска исполняемого файла
// fileName - название исполняемого файла генератора
// preSeedCommand - команды, которые вводятся перед ядром(можно передать null, когда их нет)
// seed - ядро
// postSeedCommand - команды, которые вводятся после ядра(можно передать null, когда их нет)

private fun generate(command: String, fileName: String, preSeedCommand: String?, seed: Long, postSeedCommand: String?) =
    BufferedReader(
        InputStreamReader(
            Runtime.getRuntime()
                .exec(
                    "$command $path$fileName ${preSeedCommand ?: ""} $seed ${postSeedCommand ?: ""}"
                ).inputStream
        )
    ).readText()

fun getSolution(id: Int, seed: Long) = when (id) {
    1 -> {
        //в нашем случае используется компиляция c++ для низкоуровневой виртуальной машины llvm и запуск с помощью graalvm
        //командой lli
        generate("lli", "a_plus_b_gen.bc", null, seed, null).run {
            Solution(
                problem = substringBefore("% == разделитель условия и ответа =="),
                answer = substringAfter("% == разделитель условия и ответа ==")
            )
        }
    }
    2 -> {
        generate("python3", "task_generator.py", null, seed, null).run {
            Solution(
                problem = substringBefore("% == разделитель условия и ответа =="),
                answer = substringAfter("% == разделитель условия и ответа ==")
            )
        }
    }
    3 -> {
        generate("lli", "NODgenerator.bc", "0", seed, null).run {
            Solution(
                problem = substringBefore(":") + ":" + "\n" + '$' + "f(x)" + substringAfter("f(x)").substringBefore("\ng(x)") + '$' +
                        "\n" + '$' + "g(x)" + substringAfter("g(x)").substringBefore("\n==================") + '$',
                answer = '$' + substringAfter("==================") + '$'
            )
        }
    }
    4 -> {
        generate("lli", "NODgenerator.bc", "1", seed, null).run {
            Solution(
                problem = substringBefore(":") + ":" + "\n" + '$' + "f(x)" + substringAfter("f(x)").substringBefore("\ng(x)") + '$' +
                        "\n" + '$' + "g(x)" + substringAfter("g(x)").substringBefore("\n==================") + '$',
                answer = '$' + substringAfter("==================") + '$'
            )
        }
    }
    5 -> {
        generate("lli", "svidetile_gen.bc", null, seed, null).run {
            Solution(
                problem = substringAfter("uline{Задание}:}")
                    .substringBefore("\\begin{flushleft}")
                        + substringAfter("\\begin{verse}")
                    .substringBefore("\\\\")
                        + "\n"
                        + substringAfter("\\\\")
                    .substringBefore("\\end{verse}")
                        + "\n"
                        + substringAfter("\\end{flushleft}")
                    .substringBefore("\\\\"),
                answer = substringAfter("\\textbf{\\uline{Ответ}:}")
                    .substringBefore("\\\\")
            )
        }
    }
    else -> null
}