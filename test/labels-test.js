const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const labelData = require('./labels.json');

chai.should();

describe('labels', () => {
  it('givenLabelDetails_whenProper_shouldAbleToCreateALabel', (done) => {
    chai
      .request(server)
      .post('/labels')
      .set('token', `${labelData.labels.credential.token}`)
      .send(labelData.labels.createLabel)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('givenToken_whenImProper_shouldNotAbleToCreateALabel', (done) => {
    chai
      .request(server)
      .post('/labels')
      .set('token', `${labelData.labels.credential.wrongToken}`)
      .send(labelData.labels.createLabel)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});
