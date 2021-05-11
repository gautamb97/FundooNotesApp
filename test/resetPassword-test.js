const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const resetDetails = require('./user.json');

chai.should();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ind3dy5nYXV0YW05NzE5OTdAZ21haWwuY29tIiwiaWQiOiI2MDk3YTU1MjNmYTUwZDAxYTRhNTY0N2IiLCJpYXQiOjE2MjA3MDI5MTgsImV4cCI6MTYyMDc4OTMxOH0.O4CXcmK32cUAj3D6tdkabmrCv8QmNmZPdmz_Or0asM4';
const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ind3dy5nYXV0YW05NzE5OTdAZ21haWwuY29tIiwi';

describe('resetPassword', () => {
  it('givenToken_whenImproper_shouldNotResetPassword', (done) => {
    const resetPasswordDetails = resetDetails.user.resetPassword;
    chai
      .request(server)
      .post('/resetPassword')
      .set('token', `${wrongToken}`)
      .send(resetPasswordDetails)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('givenToken_whenProper_shouldResetPassword', (done) => {
    const resetPasswordDetails = resetDetails.user.resetPassword;
    chai
      .request(server)
      .post('/resetPassword')
      .set('token', `${token}`)
      .send(resetPasswordDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
