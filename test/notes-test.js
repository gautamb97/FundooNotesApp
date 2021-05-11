const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const noteData = require('./notes.json');

chai.should();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ind3dy5nYXV0YW05NzE5OTdAZ21haWwuY29tIiwiaWQiOiI2MDk3YTU1MjNmYTUwZDAxYTRhNTY0N2IiLCJpYXQiOjE2MjA3NDI2ODMsImV4cCI6MTYyMDgyOTA4M30.6IGiHWT-Hvx17UprOvCbla4LpzRfs2FQftmBWAdwMpI';

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
        res.should.have.status(500);
      });
    done();
  });
});
