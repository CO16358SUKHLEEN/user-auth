const HALF_HOUR = 1000 * 60 * 30;
const {
    SECRET = 'keyboard cat',
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT = HALF_HOUR
} = process.env;

const SESSION_OPTIONS = {
    secret: SECRET,
    name: SESSION_NAME, 
    cookie: {
        maxAge: SESSION_IDLE_TIMEOUT
    }
}
module.exports = SESSION_OPTIONS