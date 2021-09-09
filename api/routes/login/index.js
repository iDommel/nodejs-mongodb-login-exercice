import User from '../../models/User'

const postLogin = async (req, res) => {
    User.findOne({ email: req.body.email }, async (err, user) => {
        try {
            if (
                user != null &&
                (await bcrypt.compare(req.body.password, user.password))
            ) {
                console.log(req.body.email + " connected.");
                res.status(200).redirect(301, `${process.env.API_BASE_URL}`);
            } else {
                res.send("Invalid email or Password");
            }
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    });
};



export default (router) => {
    router.route('/')
        .post(postLogin);
};