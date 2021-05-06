const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const emailData = require('./forgotPassword.json');

chai.should();

describe('forgotPassword', () => {
  it('givenEmail_whenProper_shouldSendMail', (done) => {
    const forgotPasswordDetails = emailData.user.forgotPasswordData;
    chai
      .request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenEmail_whenImproper_shouldNotSendMail', (done) => {
    const forgotPasswordDetails = emailData.user.forgotPasswordWithImproperDetails;
    chai
      .request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
