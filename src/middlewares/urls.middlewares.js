import urlSchema from "../schemas/urls.schemas.js"
import { STATUS } from "../enums/status.js"


const validateUrl = (req, res, next) => {
    const { url } = req.body

    const validUrl = urlSchema.validate({ url })
    
    if (validUrl.error){
        res.status(STATUS.UNPROCESSABLE_ENTITY).send(validUrl.error.details.map(error => error.message))
        return
    }

    next()
}


export { validateUrl }