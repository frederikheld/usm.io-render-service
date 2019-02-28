'use strict'

const logger = require('../../lib/logger/logger')

const path = require('path')

const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiMatch = require('chai-match')
chai.use(chaiMatch)

const chaiFiles = require('chai-files')
chai.use(chaiFiles)

const file = chaiFiles.file
const directory = chaiFiles.dir

const should = chai.should()
const expect = chai.expect

const fs = require('fs')
const fx = require('mkdir-recursive')
const rimraf = require('rimraf')
// const mockFs = require('mock-fs')

describe('The usm.io render service', () => {
    let server

    beforeEach(() => {
        server = require(path.join(__dirname, '..', 'server'))
    })

    afterEach(() => {
        server.close()
    })

    describe.only('GET /api/hello', () => {
        it.only('returns "Hello <name>!" if query parameter "name" is given', (done) => {
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

        it('returns "Hello World!" if query parameter "name" is NOT given', (done) => {
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

    describe('POST /api/render/html', () => {
        let server
        let mockData = {
            json: {}
        }

        // beforeEach(() => {
        //     server = require(path.join(__dirname, '..', 'server'))
        // })

        // afterEach(() => {
        //     server.close()
        // })

        it('is accessible', (done) => {
            chai
                .request(server)
                .post('/api/render/html')
                .set('content-type', 'application/json')
                .send({
                    usm: {}
                })
                .end((err, res) => {
                    logger.debug(err)
                    should.not.exist(err)

                    should.exist(res)
                    res.status.should.equal(200)

                    done()
                })
        })

        describe('error states', () => {
            it('answers with 400 (Bad Request) if no data sent', (done) => {
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

            it('answers with 400 (Bad Request) if empty object sent', (done) => {
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

            it('answers with 400 (Bad Request) if field "usm" is missing', (done) => {
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

        context('The JSON data is a valid description of an USM', () => {
            const outDir = path.join(__dirname, '..', 'download')

            beforeEach((done) => {
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

            afterEach((done) => {
                rimraf(path.join(outDir, '*'), {}, () => {
                    fx.rmdir(outDir, () => {
                        done()
                    })
                })
            })

            it('takes a json formatted USM', (done) => {
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

            it("creates the download directory if it doesn't already exist", (done) => {
                // For this test we explicitly expect
                // the output dir to _not_exist:
                fs.rmdirSync(path.join(outDir))

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

            it('stores the generated usm in a file on the server', (done) => {
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

            it('returns a download token', (done) => {
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

                describe('The download token', () => {
                    it('is exactly 20 characters long', () => {
                        downloadToken.length.should.equal(20)
                    })

                    it('consists only of characters in the set [a-zA-Z0-9]', () => {
                        downloadToken.should.match(/^[a-zA-Z0-9]*$/gm)
                    })
                })
            })

            it('returns a different token with every call', async () => {
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
