const FIELDS = Object.freeze({
    USERS: {
        ID: "id",
        NAME: "name",
        EMAIL: "email",
        PASSWORD: "password",
        CREATED_AT: '"createdAt"'
    },

    SESSIONS: {
        ID: "id",
        USER_ID: '"userId"',
        TOKEN: "token",
        CREATED_AT: '"createdAt"'
    },

    LINKS: {
        ID: "id",
        USER_ID: '"userId"',
        SHORT_URL: '"shortUrl"',
        URL: "url",
        VISIT_COUNT: '"visitCount"',
        CREATED_AT: '"createdAt"'
    }
})


export default { FIELDS }