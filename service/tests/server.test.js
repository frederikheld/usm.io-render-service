'use strict'

const path = require('path')

const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiMatch = require('chai-match')
chai.use(chaiMatch)

const chaiFiles = require('chai-files')
chai.use(chaiFiles)

const directory = chaiFiles.dir

const should = chai.should()
const expect = chai.expect

const fs = require('fs')
const fx = require('mkdir-recursive')
const rimraf = require('rimraf')

describe('The usm.io render service', () => {
    let server
    beforeEach(() => {
        server = require('./../server')
    })

    afterEach(() => {
        server.close()
    })

    describe('GET /api/hello', () => {
        it('returns "Hello <name>!" if query parameter "name" is given', function (done) {
            chai.request(server)
                .get('/api/hello?name=John')
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.should.has.status(200)

                    should.exist(res.text)
                    res.text.should.equal('Hello John!')

                    done()
                })
        })

        it('returns "Hello World!" if query parameter "name" is NOT given', function (done) {
            chai.request(server)
                .get('/api/hello')
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.should.have.status(200)

                    should.exist(res.text)
                    res.text.should.equal('Hello World!')

                    done()
                })
        })
    })

    describe('POST /api/render/html', function () {
        let mockData = {
            json: {}
        }

        it('is accessible', function (done) {
            chai
                .request(server)
                .post('/api/render/html')
                .set('content-type', 'application/json')
                .send({
                    usm: {}
                })
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.status.should.equal(200)

                    done()
                })
        })

        describe('error states', () => {
            it('answers with 400 (Bad Request) if no data sent', function (done) {
                chai
                    .request(server)
                    .post('/api/render/html')
                    .end((err, res) => {
                        should.not.exist(err)

                        should.exist(res)
                        res.status.should.equal(400)

                        done()
                    })
            })

            it('answers with 400 (Bad Request) if empty object sent', function (done) {
                chai
                    .request(server)
                    .post('/api/render/html')
                    .send({})
                    .end((err, res) => {
                        should.not.exist(err)

                        should.exist(res)
                        res.status.should.equal(400)

                        done()
                    })
            })

            it('answers with 400 (Bad Request) if field "usm" is missing', function (done) {
                chai
                    .request(server)
                    .post('/api/render/html')
                    .send({
                        foo: 'bar'
                    })
                    .end((err, res) => {
                        should.not.exist(err)

                        should.exist(res)
                        res.status.should.equal(400)

                        done()
                    })
            })
        })

        context('The JSON data is a valid description of an USM', function () {
            const outDir = path.join(__dirname, '..', 'download')

            beforeEach(function (done) {
                const rawUsm = fs.readFileSync(
                    path.join(__dirname, 'mock-data', 'mock-usm-full.json')
                )
                mockData.json.usmFull = JSON.parse(rawUsm)

                rimraf(path.join(outDir, '*'), {}, () => {
                    fx.mkdir(outDir, () => {
                        done()
                    })
                })
                // I decided to get rid of mock-fs since it doesn't
                // seem to actually work or at least not as I expect
                // it to work.
                // File operations are now done in real file system!
                // Don't forget to delete the directory after each test!
            })

            afterEach(function (done) {
                rimraf(path.join(outDir, '*'), {}, () => {
                    fx.rmdir(outDir, () => {
                        done()
                    })
                })
            })

            it('takes a json formatted USM', function (done) {
                chai
                    .request(server)
                    .post('/api/render/html')
                    .set('content-type', 'application/json')
                    .send({
                        usm: mockData.json.usmFull
                    })
                    .end((err, res) => {
                        should.not.exist(err)

                        should.exist(res)
                        res.status.should.equal(200)

                        done()
                    })
            })

            it('creates the download directory if it doesn\'t already exist', function (done) {
                // For this test we explicitly expect
                // the output dir to _not_exist:
                if (fs.existsSync(outDir)) {
                    fs.rmdirSync(outDir)
                }

                expect(directory(outDir)).to.not.exist

                chai
                    .request(server)
                    .post('/api/render/html')
                    .set('content-type', 'application/json')
                    .send({
                        usm: mockData.json.usmFull
                    })
                    .end((err, res) => {
                        if (err) {
                            throw err
                        }
                        expect(directory(outDir)).to.exist

                        done()
                    })
            })

            it('stores the generated usm in a file on the server', function (done) {
                expect(directory(outDir)).to.be.empty

                chai.request(server)
                    .post('/api/render/html')
                    .set('content-type', 'application/json')
                    .send({
                        usm: 'foo'
                    })
                    .end((err, res) => {
                        if (err) {
                            throw err
                        }

                        expect(directory(outDir)).to.not.be.empty

                        done()
                    })
            })

            it('returns a download token', function (done) {
                let downloadToken

                chai.request(server)
                    .post('/api/render/html')
                    .set('content-type', 'application/json')
                    .send({
                        usm: 'foo'
                    })
                    .end((err, res) => {
                        if (err) {
                            throw err
                        }

                        expect(res.body.token).to.exist
                        downloadToken = res.body.token

                        done()
                    })

                describe('The download token', function () {
                    it('is exactly 20 characters long', function () {
                        downloadToken.length.should.equal(20)
                    })

                    it('consists only of characters in the set [a-zA-Z0-9]', function () {
                        downloadToken.should.match(/^[a-zA-Z0-9]*$/gm)
                    })
                })
            })

            it('returns a different token with every call', async function () {
                this.slow(200)

                const receiveToken = () => {
                    return new Promise((resolve, reject) => {
                        chai.request(server)
                            .post('/api/render/html')
                            .set('content-type', 'application/json')
                            .send({
                                usm: 'foo'
                            })
                            .end((err, res) => {
                                if (err) {
                                    throw err
                                }
                                resolve(res.body.token)
                            })
                    })
                }

                // receive tokens:
                let tokens = []
                for (let i = 0; i < 10; i++) {
                    tokens.push(await receiveToken())
                }

                // check tokens for duplicates:
                tokens.forEach((item, index) => {
                    tokens.lastIndexOf(item).should.equal(index)
                })

                // NOTE: With a token length of 20 and this very small sample set,
                //       this test would be very unlikely to fail, even if there
                //       was no mechanism that prevented duplicates!
            })
        })

        //         context('The JSON data is a valid description of an USM', () => {

        //
    })
})

// describe('GET /download', () => {

// context('with valid download token', () => {

//     it('returns a svg file')

// })

// })

// })
