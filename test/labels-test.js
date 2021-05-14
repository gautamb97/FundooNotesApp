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

  it('givenLabelDetails_whenMissing_shouldNotAbleToCreateALabel', (done) => {
    chai
      .request(server)
      .post('/labels')
      .set('token', `${labelData.labels.credential.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(500);
      });
    done();
  });

  it('givenLabelDetails_whenTokenMissing_shouldNotAbleToCreateALabel', (done) => {
    chai
      .request(server)
      .post('/labels')
      .send(labelData.labels.createLabel)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});

describe('labels', () => {
  it('givenToken_whenProper_shouldAbleToGetAllLabels', (done) => {
    chai
      .request(server)
      .get('/labels')
      .set('token', `${labelData.labels.credential.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('givenToken_whenImProper_shouldNotAbleToGetAllLabels', (done) => {
    chai
      .request(server)
      .get('/labels')
      .set('token', `${labelData.labels.credential.wrongToken}`)
      .send()
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });

  it('givenToken_whenMissing_shouldNotAbleToGetAllLabels', (done) => {
    chai
      .request(server)
      .get('/labels')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});

describe('update labels', () => {
  it('givenUpdateDetails_whenProper_shouldAbleToUpdateTheLabel', (done) => {
    chai
      .request(server)
      .put('/labels/609e5065343213120c556424')
      .set('token', `${labelData.labels.credential.token}`)
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('givenWrongLabelId_whenImProper_shouldNotAbleToUpdateTheLabel', (done) => {
    chai
      .request(server)
      .put('/labels/609e5065343213120c5564')
      .set('token', `${labelData.labels.credential.token}`)
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenLabelId_whenMissing_shouldNotAbleToUpdateTheLabel', (done) => {
    chai
      .request(server)
      .put('/labels/')
      .set('token', `${labelData.labels.credential.token}`)
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });

  it('givenUpdateDetails_whenProper_ButWrongToken_shouldNotAbleToUpdateTheLabel', (done) => {
    chai
      .request(server)
      .put('/labels/609e5065343213120c556424')
      .set('token', `${labelData.labels.credential.wrongToken}`)
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});
