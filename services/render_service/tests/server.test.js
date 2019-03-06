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

const fs = require('fs').promises
const fx = require('mkdir-recursive')
const rimraf = require('rimraf')

describe('The usm.io render service', () => {
    const outDir = path.join(__dirname, '..', 'download')
    let server

    beforeEach(function (done) {
        server = require('./../server')

        rimraf(path.join(outDir, '*'), {}, () => {
            fx.mkdir(outDir, () => {
                done()
            })
        })
        // NOTE: I decided to get rid of mock-fs since it doesn't
        // seem to  work well or at least not as I would expect
        // it to work.
        // File operations are now done in real file system!
        // Don't forget to delete the directory after each test!
        // Don't run different instances of this test suite in
        // parallel as they will interfere with fs operations!
    })

    afterEach(function (done) {
        server.close()

        rimraf(path.join(outDir, '*'), {}, () => {
            fx.rmdir(outDir, () => {
                done()
            })
        })
    })

    describe('GET /api/hello', () => {
        it('returns "Hello <name>!" if query parameter "name" is given', function (done) {
            chai.request(server)
                .get('/api/hello')
                .query({ name: 'John' })
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

        describe('error states ', function () {
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
        })

        describe('parameter usm', () => {
            it('answers with 400 (Bad Request) if field "usm" is missing', function (done) {
                chai
                    .request(server)
                    .post('/api/render/html')
                    .send({
                        foo: 'this field is not "usm"'
                    })
                    .end((err, res) => {
                        should.not.exist(err)

                        should.exist(res)
                        res.status.should.equal(400)

                        done()
                    })
            })

            it('answers with 400 (Bad Request) if content of field "usm" is not an object', function (done) {
                chai
                    .request(server)
                    .post('/api/render/html')
                    .send({
                        usm: 'this is not an object'
                    })
                    .end((err, res) => {
                        should.not.exist(err)

                        should.exist(res)
                        res.status.should.equal(400)

                        done()
                    })
            })

            context('usm contains a valid description of an USM', function () {
                beforeEach(async function () {
                    mockData.json.usmFull = JSON.parse(await fs.readFile(path.join(__dirname, 'mock-data', 'mock-usm-full.json')))
                })

                afterEach(function () { })

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

                it('creates the download directory if it doesn\'t already exist', async function () {
                // For this test we explicitly expect
                // the output dir to _not_ exist:
                    try {
                        await fs.rmdir(outDir)
                    } catch (err) {
                        if (err.code === 'ENOENT') {
                        // Do nothing. To not have the directory is exactly what we want.
                        } else {
                            throw err
                        }
                    }

                    expect(directory(outDir)).to.not.exist

                    return chai
                        .request(server)
                        .post('/api/render/html')
                        .set('content-type', 'application/json')
                        .send({
                            usm: mockData.json.usmFull
                        })
                        .then(
                            (res) => {
                                expect(directory(outDir)).to.exist
                            },
                            (err) => {
                                throw err
                            }
                        )
                })

                it('stores the generated usm in a file on the server', function (done) {
                    expect(directory(outDir)).to.be.empty

                    chai.request(server)
                        .post('/api/render/html')
                        .set('content-type', 'application/json')
                        .send({
                            usm: {}
                        })
                        .end((err, res) => {
                            should.not.exist(err)

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
                            usm: {}
                        })
                        .end((err, res) => {
                            should.not.exist(err)

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
                                    usm: {}
                                })
                                .end((err, res) => {
                                    should.not.exist(err)

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
        })

        describe('paramter css', function () {
            it('is optional', function (done) {
                chai
                    .request(server)
                    .post('/api/render/html')
                    .send({
                        usm: {}
                    })
                    .end((err, res) => {
                        should.not.exist(err)
                        res.status.should.equal(200)

                        done()
                    })
            })

            // it('if not given, no stylesheet is embedded', function (done) {
            //     chai
            //         .request(server)
            //         .post('/api/render/html')
            //         .send({
            //             usm: {}
            //         })
            //         .end(async (err, res) => {
            //             should.not.exist(err)

            //             res.status.should.equal(200)
            //             expect(res.body.token).to.exist
            //             expect(file(res.body.token)).to.equal(await fs.readFile('./mock-data/mock-usm-basic.html'))

            //             done()
            //         })
            // })
        })
    })

    describe('GET /api/download', function () {
        // it('is accessible', async function () {
        //     return chai
        //         .request(server)
        //         .get('/api/download')
        //         .then(
        //             function (res) {
        //                 should.exist(res)
        //                 res.status.should.equal(200)
        //             },
        //             function (err) {
        //                 throw err
        //             })
        // })

        context('with valid download token', function (done) {
            let downloadToken

            beforeEach(async function () {
                const jsonInput = JSON.parse(await fs.readFile(path.join(__dirname, 'mock-data', 'mock-usm-basic.json'), 'utf8'))

                return chai.request(server)
                    .post('/api/render/html')
                    .set('content-type', 'application/json')
                    .send({
                        usm: jsonInput
                    })
                    .then(
                        (res) => {
                            expect(res.body.token).to.exist
                            downloadToken = res.body.token
                        },
                        (err) => {
                            throw err
                        }
                    )
            })

            it('returns a html string', async function () {
                const expectedHtmlRaw = await fs.readFile(path.join(__dirname, 'mock-data', 'mock-usm-basic.html'), 'utf8')
                const expectedHtmlStrippedForComparison = expectedHtmlRaw.replace(/\s/g, '')

                return chai
                    .request(server)
                    .get('/api/download')
                    .query({ token: downloadToken })
                    .then(
                        (res) => {
                            let actualHtmlRaw = res.body.html
                            let actualHtmlStrippedForComparison = actualHtmlRaw.replace(/\s/g, '')

                            actualHtmlStrippedForComparison.should.equal(expectedHtmlStrippedForComparison)
                        },
                        (err) => {
                            throw err
                        }
                    )

                // NOTE: Whitespaces characters are stripped in this test
                //       since indentation and newlines don't work well
                //       but this is just cosmetics that has no impact
                //       to the page as it is displayed in the browser.
            })
        })
    })
})
