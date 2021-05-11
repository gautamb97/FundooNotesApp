const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const noteData = require('./notes.json');

chai.should();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ind3dy5nYXV0YW05NzE5OTdAZ21haWwuY29tIiwiaWQiOiI2MDk3YTU1MjNmYTUwZDAxYTRhNTY0N2IiLCJpYXQiOjE2MjA3NDI2ODMsImV4cCI6MTYyMDgyOTA4M30.6IGiHWT-Hvx17UprOvCbla4LpzRfs2FQftmBWAdwMpI';
const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ind3dy5nYXV0YW05NzE5OTdAZ21haWwuY29tIiwiaWQiOiI';

describe('notes', () => {
  it('givenNoteDetails_whenProper_shouldAbleToCreateANote', (done) => {
    const noteDetails = noteData.notes.createNote;
    chai
      .request(server)
      .post('/notes')
      .set('token', `${token}`)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteDetails_whenImProper_shouldNotAbleToCreateANote', (done) => {
    const noteDetails = noteData.notes.createNoteWithImproperData;
    chai
      .request(server)
      .post('/notes')
      .set('token', `${token}`)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenNoteDetails_whenProper_ButTokenMissing_shouldNotAbleToCreateANote', (done) => {
    const noteDetails = noteData.notes.createNote;
    chai
      .request(server)
      .post('/notes')
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });

  it('givenNoteDetails_whenProper_ButTokenIsWrong_shouldNotAbleToCreateANote', (done) => {
    const noteDetails = noteData.notes.createNoteWithImproperData;
    chai
      .request(server)
      .post('/notes')
      .set('token', `${wrongToken}`)
      .send(noteDetails)
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
      .set('token', `${token}`)
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
      .set('token', `${wrongToken}`)
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('update notes', () => {
  it('givenNoteIDDetails_whenProper_shouldAbleToUpdate_ExistingNote', (done) => {
    const noteDetails = noteData.notes.updateData;
    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119a9')
      .set('token', `${token}`)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteIDDetails_whenNotIDImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    const noteDetails = noteData.notes.updateData;
    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119')
      .set('token', `${token}`)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenToken_whenImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    const noteDetails = noteData.notes.updateData;
    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119')
      .set('token', `${wrongToken}`)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });

  it('givenNoteIDisEmpty_whenImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    const noteDetails = noteData.notes.updateData;
    chai
      .request(server)
      .put('/notes/')
      .set('token', `${token}`)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });
});

describe('delete note', () => {
  it('givenNoteIDDetails_whenProper_shouldAbleToAddInTrash', (done) => {
    const noteDetails = noteData.notes.changeTrashStatus;
    chai
      .request(server)
      .delete('/notes/60961015ba511f4c480119a9')
      .set('token', `${token}`)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
