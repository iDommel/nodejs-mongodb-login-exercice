import User from '../../models/User/index.js'
// register
const postRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log("Created user " + req.body.email);
        res.status(200).redirect(301, `localhost:3000/login`);
    } catch (err) {
        res.status(500).send();
    }
};

export default (router) => {
    router.route('/')
        .post(postRegister)
        ;
}