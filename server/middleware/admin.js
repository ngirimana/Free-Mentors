
import status from '../helpers/StatusCode';
import verifytoken from '../helpers/tokens';
import response from '../helpers/response';

class Admin {
  static verifyAdmin(req, res, next) {
    const adminToken = req.header('x-auth-token');
    if (!adminToken) {
      return response.errorMessage(req, res, 400, 'Provide your login or signup  Token');
    }
    try {
      const decode = verifytoken.verifyadmin(adminToken);
      if (decode !== true) {
        return response.errorMessage(req, res, 401, ' You are not authorized to perform this task because your not admin');
      }
      next();
    } catch (error) {
      return response.errorMessage(req, res, status.SERVER_ERROR, error.message);
    }
  }
}

export default Admin;
