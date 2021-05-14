const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const labelData = require('./labels.json');

chai.should();

describe('labels', () => {
  it('givenLabelDetails_whenProper_shouldAbleToCreateALabel', (done) => {
    const noteDetails = labelData.labels.createLabel;
    chai
      .request(server)
      .post('/labels')
      .set('token', `${labelData.labels.credential.token}`)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
