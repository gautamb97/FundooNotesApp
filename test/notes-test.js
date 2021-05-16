const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const noteData = require('./notes.json');

chai.should();

describe('notes', () => {
  it('givenNoteDetails_whenProper_shouldAbleToCreateANote', (done) => {
    chai
      .request(server)
      .post('/notes')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.createNote)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteDetails_whenImProper_shouldNotAbleToCreateANote', (done) => {
    chai
      .request(server)
      .post('/notes')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.createNoteWithImproperData)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenNoteDetails_whenProper_ButTokenMissing_shouldNotAbleToCreateANote', (done) => {
    chai
      .request(server)
      .post('/notes')
      .send(noteData.notes.createNote)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });

  it('givenNoteDetails_whenProper_ButTokenIsWrong_shouldNotAbleToCreateANote', (done) => {
    chai
      .request(server)
      .post('/notes')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send(noteData.notes.createNoteWithImproperData)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});

describe('getAllNotes', () => {
  it('givenDetails_whenProper_shouldAbleToRetriveAllNote', (done) => {
    chai
      .request(server)
      .get('/notes')
      .set('token', `${noteData.notes.credential.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenToken_whenImProper_shouldNotAbleToRetriveAllNote', (done) => {
    chai
      .request(server)
      .get('/notes')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('update notes', () => {
  it('givenNoteIDDetails_whenProper_shouldAbleToUpdate_ExistingNote', (done) => {
    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119a9')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.updateData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteIDDetails_whenNotIDImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.updateData)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenToken_whenImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send(noteData.notes.updateData)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });

  it('givenNoteIDisEmpty_whenImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    chai
      .request(server)
      .put('/notes/')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.updateData)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });
});

describe('delete note', () => {
  it('givenNoteIDDetails_whenProper_shouldAbleToAddInTrash', (done) => {
    chai
      .request(server)
      .delete('/notes/60961015ba511f4c480119a9')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.changeTrashStatus)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteIDDetails_whenEmpty_shouldNotAbleToAddInTrash', (done) => {
    chai
      .request(server)
      .delete('/notes/')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.changeTrashStatus)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('givenNoteIDDetails_whenImProper_shouldNotAbleToAddInTrash', (done) => {
    chai
      .request(server)
      .delete('/notes/60961015ba511f4c480119')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.changeTrashStatus)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenToken_whenImProper_shouldNotAbleToAddInTrash', (done) => {
    chai
      .request(server)
      .delete('/notes/60961015ba511f4c480119a9')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send(noteData.notes.changeTrashStatus)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('givenToken_whenEmpty_shouldAbleToAddInTrash', (done) => {
    chai
      .request(server)
      .delete('/notes/60961015ba511f4c480119a9')
      .send(noteData.notes.changeTrashStatus)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('add label to note', () => {
  it.only('givenDetails_whenProper_shouldAbleToAddLabelToTheNote', () => {
    chai
      .request(server)
      .post('/addLabelToNote')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.addLabelWithProperDetails)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('givenDetails_whenImProperToken_shouldNotAbleToAddLabelToTheNote', () => {
    chai
      .request(server)
      .post('/addLabelToNote')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send(noteData.notes.addLabelWithProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('givenDetails_whenTokenMissing_shouldNotAbleToAddLabelToTheNote', () => {
    chai
      .request(server)
      .post('/addLabelToNote')
      .send(noteData.notes.addLabelWithProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('givenDetails_whenMissing_shouldNotAbleToAddLabelToTheNote', () => {
    chai
      .request(server)
      .post('/addLabelToNote')
      .set('token', `${noteData.notes.credential.token}`)
      .end((err, res) => {
        res.should.have.status(400);
      });
  });
});

describe('dalete label for note', () => {
  it.only('givenDetails_whenProper_shouldAbleToDeleteLabelFromTheNote', () => {
    chai
      .request(server)
      .delete('/removeLabelFromNote')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.addLabelWithProperDetails)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('givenDetails_whenImProperToken_shouldNotAbleToDeleteLabelFromTheNote', () => {
    chai
      .request(server)
      .delete('/removeLabelFromNote')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send(noteData.notes.addLabelWithProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('givenDetails_whenTokenMissing_shouldNotAbleDeleteFromTheNote', () => {
    chai
      .request(server)
      .delete('/removeLabelFromNote')
      .send(noteData.notes.addLabelWithProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('givenDetails_whenMissing_shouldNotAbleToDeleteFromTheNote', () => {
    chai
      .request(server)
      .delete('/removeLabelFromNote')
      .set('token', `${noteData.notes.credential.token}`)
      .end((err, res) => {
        res.should.have.status(400);
      });
  });
});
