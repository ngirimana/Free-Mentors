import UserInfo from '../helpers/userInfos';
import status from '../helpers/StatusCode';
import Session from './session_model';
import User from './user_model';


class Review {
  constructor() {
    this.reviews = [
      {
        reviewId: 1,
        sessionId: 1,
        mentorId: 2,
        menteeId: 1,
        score: 4,
        menteeFullName: 'safari pascal',
        remark: 'gjdsghjshn bkjkssgj jdgjsbjsn dksdgndk jjbjdfbn ',
      },
    ];
  }
  // createreview

  create = (payload, res, token) => {
    let currentId = this.reviews.length + 1;
    let newReview = {
      reviewId: currentId,
      sessionId: parseInt(payload.params.id, 10),
      mentorId: Session.mentorInfo(res, parseInt(payload.params.id, 10)),
      menteeId: UserInfo(res, token),
      score: payload.body.score,
      menteeFullName: User.fullName(UserInfo(res, token)),
      remark: payload.body.remark,
    };
    this.reviews.push(newReview);
    newReview = {
      status: status.REQUEST_SUCCEEDED,
      message: 'Review created',
      data: newReview,
    };
    return newReview;
  }
}

export default new Review();
