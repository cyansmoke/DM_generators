package controllers.base.responses

import com.google.gson.annotations.Expose

open class BaseResponse(@field:Expose val status: String,
                        @field:Expose val error: String? = null,
                        @field:Expose(serialize = false) val httpStatus: Int)