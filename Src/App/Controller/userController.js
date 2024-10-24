const userUsecases = require('./../Usecases/userUsecases')

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password,'user');
        
        const { token, user } = await userUsecases.loginUser(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const userData = async (req, res, next) => {
    try {
        const { email } = req.params
        const {user}=await userUsecases.userData(email)
        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ message: 'Error while User Details' });
    }
};

module.exports={
    loginUser,
    userData,
}
