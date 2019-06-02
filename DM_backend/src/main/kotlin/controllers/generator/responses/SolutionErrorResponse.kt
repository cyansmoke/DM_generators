package controllers.generator.responses

import controllers.base.responses.BaseErrorResponse

class SolutionErrorResponse(error: String): BaseErrorResponse(error, 401)