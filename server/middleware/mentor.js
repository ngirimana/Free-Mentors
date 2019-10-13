
import status from '../helpers/StatusCode';
import verifytoken from '../helpers/tokens';
import response from '../helpers/response';


export const verifyMentor = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return response.errorMessage(req, res, status.BAD_REQUEST, 'Provide a Token');
  }
  try {
    const decode = verifytoken.verifymentor(token);
    if (decode !== true) {
      return response.errorMessage(req, res, status.UNAUTHORIZED, 'You are not a mentor,so you are not authorized to perform this task');
    }
    next();
  } catch (error) {
    return response.errorMessage(req, res, status.SERVER_ERROR, error.message);
  }
};


export default verifyMentor;
