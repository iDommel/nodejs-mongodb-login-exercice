import User from '../../models/User';

const getUsers = (req, res, next) => {

    try {
        User.find(async (err, users) => {
            if (err) {
                res.status(500).send("Couldn't retrieve users");
            } else {
                res.status(200).send(users);
            }
        });
    } catch(e) {
        res.status(400).send(e);
    }
}




export default (router) => {
    router.route('/')
        .get(getUsers);
};