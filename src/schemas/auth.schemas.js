import joi from "joi"

const signUpSchema = joi.object({
    name: joi.string()
        .max(50).required(),

    email: joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: joi.any()
        .required(),
    
    confirmPassword: joi.ref('password')
})


const signInSchema = joi.object({
    email: joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: joi.string()
        .required()
})


export { signUpSchema, signInSchema }