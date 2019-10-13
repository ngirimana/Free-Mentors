import Model from '../models/queries';
import verifytoken from '../helpers/tokens';
import response from '../helpers/response';


const model = new Model('users');


const verifyAuth = async (req, res, next) => {
  const authToken = req.header('x-auth-token');
  if (!authToken) {
    return response.errorMessage(req, res, 400, 'You haven\'t provide your token');
  }
  try {
    const decode = verifytoken.verifyToken(authToken);
    const user = await model.select('*', 'id=$1', [decode]);
    if (!user.length) {
      return response.errorMessage(req, res, 401, 'You are not authorized to perform this task');
    }

    next();
  } catch (error) {
    return response.errorMessage(req, res, 400, error.message);
  }
};


export default verifyAuth;
