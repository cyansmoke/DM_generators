package controllers.base.responses

open class BaseErrorResponse(error: String, httpStatus: Int): BaseResponse("error", error, httpStatus)