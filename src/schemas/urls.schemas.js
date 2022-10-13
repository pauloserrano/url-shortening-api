import joi from "joi"


const urlSchema = joi.object({
    url: joi.string()
        .pattern(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
        .required()
})


export default urlSchema