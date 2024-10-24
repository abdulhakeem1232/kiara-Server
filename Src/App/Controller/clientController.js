const clientUsecases = require('./../Usecases/clientUsecases')

const loginClient = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password,'client');
        
        const { token, client } = await clientUsecases.loginClient(email, password);
        res.status(200).json({ token, client });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const clientData = async (req, res, next) => {
    try {
        const { email } = req.params
        console.log(email,'client');
        const {client}=await clientUsecases.clientData(email)
        res.status(200).json({ client });
    } catch (error) {
        res.status(401).json({ message: 'Error while Client Details' });
    }
};

module.exports={
    loginClient,
    clientData,
}
