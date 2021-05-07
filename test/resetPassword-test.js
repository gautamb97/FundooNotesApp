const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const resetDetails = require('./user.json');

chai.should();

describe('resetPassword', () => {
  it('givenToken_whenImproper_shouldNotResetPassword', (done) => {
    const resetPasswordDetails = resetDetails.user.resetPasswordWithExpiredToken;
    chai
      .request(server)
      .post('/resetPassword')
      .send(resetPasswordDetails)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
