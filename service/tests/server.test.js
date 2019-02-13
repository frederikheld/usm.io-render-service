'use strict'

const logger = require('../../lib/logger/logger')

const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiMatch = require('chai-match')
chai.use(chaiMatch)

const should = chai.should()

const fs = require('fs')

// const mockFs = require('mock-fs')

describe('The usm.io render service', () => {

    describe('GET /api/hello', () => {

        let server

        beforeEach(() => {
            server = require('../../service/server')
        })

        afterEach(() => {
            server.close()

        })

        it('returns "Hello <name>!" if query parameter "name" is given', (done) => {

            chai.request(server)
                .get('/api/hello?name=John')
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.should.has.status(200)

                    should.exist(res.text)
                    res.text.should.equal("Hello John!")

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
                    res.text.should.equal("Hello World!")

                    done()

                })

        })

    })

    describe.only('POST /api/render/html', () => {

        let server
        let mockData = {
            json: {}
        }

        beforeEach((done) => {
            server = require(__dirname + '/../server')

            const rawUsm = fs.readFileSync(__dirname + '/mock-data/mock-usm-full.json')
            mockData.json.usmFull = JSON.parse(rawUsm)

            done()
        })

        afterEach(() => {
            server.close()
        })

        it('is accessible', (done) => {

            chai.request(server)
                .post('/api/render/html')
                .set('content-type', 'application/json')
                .send({ usm: {} })
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.status.should.equal(200)
                })

            done()
        })

        it('answers with 400 (Bad Request) if no data or empty object sent', (done) => {

            chai.request(server)
                .post('/api/render/html')
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.status.should.equal(400)
                })

            done()
        })


        it('answers with 400 (Bad Request) if no data or empty object sent', (done) => {

            chai.request(server)
                .post('/api/render/html')
                .send({})
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.status.should.equal(400)
                })

            done()
        })

        it('answers with 400 (Bad Request) if field "usm" is missing', (done) => {

            chai.request(server)
                .post('/api/render/html')
                .send({ 'foo': 'bar' })
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.status.should.equal(400)
                })

            done()
        })

        it('takes a json formatted USM', (done) => {

            chai.request(server)
                .post('/api/render/html')
                .set('content-type', 'application/json')
                .send({ usm: mockData.json.usmFull })
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.status.should.equal(200)

                    done()
                })

            context('The JSON data is a valid description of an USM', () => {

                let downloadToken

                it('returns a download token', (done) => {

                    chai.request(server)
                        .post('/api/render/html')
                        .set('content-type', 'application/json')
                        .send({ usm: mockData.json.usmFull })
                        .end((err, res) => {
                            should.not.exist(err)

                            should.exist(res.body.token)

                            done()
                        })

                })

            })

        })

    })

    describe('POST /api/render/svg', () => {

        let server
        let mockData = {
            json: {}
        }

        beforeEach((done) => {
            server = require(__dirname + '/../server')

            fs.readFile(__dirname + '/mock-data/00_mock-usm-empty.json', (err, res) => {
                if (err) throw err
                mockData.json.usm0 = JSON.parse(res)
            })

            done()
        })

        afterEach(() => {
            server.close()
        })

        it('is accessible', (done) => {

            chai.request(server)
                .post('/api/render/svg')
                .end((err, res) => {
                    should.not.exist(err)

                    should.exist(res)
                    res.status.should.equal(200)

                    done()
                })

        })

        it('takes a json formatted USM', (done) => {

            chai.request(server)
                .post('/api/render/svg')
                .set('content-type', 'application/json')
                .send({ usm: mockData.json.usm0 })
                .end((err, res) => {
                    should.not.exist(err)

                    done()
                })


            context('The JSON data is a valid description of an USM', () => {

                let downloadToken

                it('returns a download token', (done) => {

                    chai.request(server)
                        .post('/api/render/svg')
                        .set('content-type', 'application/json')
                        .send({ usm: mockData.json.usm0 })
                        .end((err, res) => {
                            should.not.exist(err)

                            should.exist(res.body.token)

                            // store token for deeper investigation
                            // in upcoming tests:
                            downloadToken = res.body.token

                            done()
                        })

                })

                describe('The download token', () => {

                    it('is exactly 20 characters long', () => {
                        downloadToken.length.should.equal(20)
                    })

                    it('consists only of characters in the set [a-zA-Z0-9]', () => {
                        downloadToken.should.match(/^[a-zA-Z0-9]*$/gm)
                    })

                })

                it('returns a different token with every call', async () => {

                    const receiveToken = () => {
                        return new Promise((resolve, reject) => {
                            chai.request(server)
                                .post('/api/render/svg')
                                .set('content-type', 'application/json')
                                .send({ usm: mockData.json.usm0 })
                                .end((err, res) => {
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

        // TODO: Finish SVG rendering!


        // let downloadToken

        // it('takes a xml file, returns a download token', (done) => {

        //     // helpers.suppressOutput()

        //     let mockXML = undefined

        //     // mockFile = fs.readFileSync(__dirname + '/mock-data/mock-usm-1.xml', 'utf-8')
        //     // console.log(mockFile)
        //     fs.readFile(__dirname + '/mock-data/mock-usm-1.xml', 'utf-8', (err, res) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //         mockXML = res

        //         // mockFs({
        //         //     download: {}
        //         // })

        //         chai.request(server)
        //             .post('/api/render/svg')
        //             // .send({
        //             //     xml: mockXML
        //             // })
        //             .end((err, res) => {
        //                 should.not.exist(err)

        //                 res.status.should.equal(200)
        //                 // should.exist(res.body.token)

        //                 // downloadToken = res.body.token

        //                 // helpers.restoreOutput()
        //                 done()
        //             })


        //         // mockFs.restore()

        //     })

        // })

    })

    describe('GET /download', () => {

        context('with valid download token', () => {

            it('returns a svg file')

        })

    })

})