import Joi from '@hapi/joi';
import Review from '../models/review_model';
import status from '../helpers/StatusCode';
import Session from '../models/session_model';


class ReviewController {
  // createreview
  creatReview = (req, res) => {
    const schema = {
      score: Joi.number().required(),
      remark: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
      console.log(req.params.id);
      if (isNaN(req.params.id.trim())) {
        return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'Session id should be an integer' });
      }
      if (!Session.uniqueSession(req.params.id)) return res.status(404).send({ status: 404, error: 'Your session with mentioned id is not found!' });
      /* if (!Session.sessionStatus(req.params.id)) {
        return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error:
          'You should review
        accepted session' });
      } */
      const review = Review.create(req, res, req.header('x-auth-token'));
      return res.status(200).send(review);
    }
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
  }
}

export default ReviewController;
