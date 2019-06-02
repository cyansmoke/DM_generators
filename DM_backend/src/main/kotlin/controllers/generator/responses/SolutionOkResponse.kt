package controllers.generator.responses

import com.google.gson.annotations.Expose
import controllers.base.responses.BaseOkResponse
import controllers.generator.data.models.Solution

class SolutionOkResponse(
    @Expose val solution: Solution
) : BaseOkResponse()