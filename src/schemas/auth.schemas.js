import joi from "joi"

const authSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
})


export { authSchema }