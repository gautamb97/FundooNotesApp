const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const labelData = require('./labels.json');

chai.should();

describe('create labels', () => {
  it.only('givenLabelDetails_whenProper_shouldAbleToCreateALabel', () => {
    chai
      .request(server)
      .post('/labels')
      .set('token', `${labelData.labels.credential.token}`)
      .send(labelData.labels.createLabel)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('givenToken_whenImProper_shouldNotAbleToCreateALabel', () => {
    chai
      .request(server)
      .post('/labels')
      .set('token', `${labelData.labels.credential.wrongToken}`)
      .send(labelData.labels.createLabel)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('givenLabelDetails_whenMissing_shouldNotAbleToCreateALabel', () => {
    chai
      .request(server)
      .post('/labels')
      .set('token', `${labelData.labels.credential.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(500);
      });
  });

  it.only('givenLabelDetails_whenTokenMissing_shouldNotAbleToCreateALabel', () => {
    chai
      .request(server)
      .post('/labels')
      .send(labelData.labels.createLabel)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });
});

describe('fetch labels', () => {
  it.only('givenToken_whenProper_shouldAbleToGetAllLabels', () => {
    chai
      .request(server)
      .get('/labels')
      .set('token', `${labelData.labels.credential.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('givenToken_whenImProper_shouldNotAbleToGetAllLabels', () => {
    chai
      .request(server)
      .get('/labels')
      .set('token', `${labelData.labels.credential.wrongToken}`)
      .send()
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('givenToken_whenMissing_shouldNotAbleToGetAllLabels', () => {
    chai
      .request(server)
      .get('/labels')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
      });
  });
});

describe('update labels', () => {
  it.only('givenUpdateDetails_whenProper_shouldAbleToUpdateTheLabel', () => {
    chai
      .request(server)
      .put('/labels/609e5065343213120c556424')
      .set('token', `${labelData.labels.credential.token}`)
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('givenWrongLabelId_whenImProper_shouldNotAbleToUpdateTheLabel', () => {
    chai
      .request(server)
      .put('/labels/609e5065343213120c5564')
      .set('token', `${labelData.labels.credential.token}`)
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it.only('givenLabelId_whenMissing_shouldNotAbleToUpdateTheLabel', () => {
    chai
      .request(server)
      .put('/labels/')
      .set('token', `${labelData.labels.credential.token}`)
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(404);
      });
  });

  it.only('givenUpdateDetails_whenProper_ButWrongToken_shouldNotAbleToUpdateTheLabel', () => {
    chai
      .request(server)
      .put('/labels/609e5065343213120c556424')
      .set('token', `${labelData.labels.credential.wrongToken}`)
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('givenUpdateDetails_whenProper_ButTokenMissing_shouldNotAbleToUpdateTheLabel', () => {
    chai
      .request(server)
      .put('/labels/609e5065343213120c556424')
      .send(labelData.labels.updateLabel)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });
});

describe('delete labels', () => {
  it.only('givenLabelId_whenProper_shouldAbleToDeletTheLabel', () => {
    chai
      .request(server)
      .delete('/labels/609e5065343213120c556424')
      .set('token', `${labelData.labels.credential.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('givenLabelId_whenImProper_shouldNotAbleToDeletTheLabel', () => {
    chai
      .request(server)
      .delete('/labels/609e5065343213120c55642')
      .set('token', `${labelData.labels.credential.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it.only('givenToken_whenImProper_shouldNotAbleToDeletTheLabel', () => {
    chai
      .request(server)
      .delete('/labels/609e47a97dfee23a10f496d6')
      .set('token', `${labelData.labels.credential.wrongToken}`)
      .send()
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('givenToken_whenMissing_shouldNotAbleToDeletTheLabel', () => {
    chai
      .request(server)
      .delete('/labels/609e47a97dfee23a10f496d6')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
      });
  });
});
