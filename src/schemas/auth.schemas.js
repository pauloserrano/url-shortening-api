import joi from "joi"

const signUpSchema = joi.object({
    name: joi.string()
        .max(50).required(),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: joi.string()
        //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    
    confirmPassword: joi.ref('password')
})


const signInSchema = joi.object({
    email: joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: joi.string()
        //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})


export { signUpSchema, signInSchema }