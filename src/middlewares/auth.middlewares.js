import bcrypt from "bcrypt"


const { USERS } = FIELDS

const validateSignIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const { rows: [ user ] } = await connection.query(`
            SELECT * FROM ${TABLES.USERS} WHERE ${USERS.EMAIL}=$1;
        `, [email])
    
        if (!user){
            res.sendStatus(STATUS.UNAUTHORIZED)
            return

        } else {
            res.locals.user = user
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword){
            res.sendStatus(STATUS.UNAUTHORIZED)
            return
        }
    
        next()
        
    } catch (error) {
        res.status(STATUS.BAD_REQUEST).send(error)
    }
}


export { validateSignIn }