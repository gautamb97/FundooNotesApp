const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const registrationData = require('./registration.json');

chai.should();

describe('registartion', () => {
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registration;
    chai
      .request(server)
      .post('/registration')
      .send(registartionDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
