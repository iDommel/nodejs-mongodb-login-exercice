import User from '../../models/User'

const logout = (req, res, next) => {
    res.send("Logged out.");
};

export default (router) => {
    router.route('/')
        .get(logout);
};