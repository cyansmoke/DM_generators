package controllers.generator.responses

import com.google.gson.annotations.Expose
import controllers.base.responses.BaseOkResponse
import controllers.generator.data.models.Generator

class GeneratorsOkResponse(
    @Expose val generators: List<Generator>) : BaseOkResponse()