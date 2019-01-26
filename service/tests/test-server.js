'use strict'

const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiMatch = require('chai-match')
chai.use(chaiMatch)

const should = chai.should()

describe('usm.io render service', () => {

    let server

    beforeEach(() => {
        server = require('../server')
    })

    afterEach(() => {
        server.close()
    })

    describe('render usm in svg', () => {

        describe('render service accepts usm in xml format at POST /render/svg', () => {

            describe('if file is valid xml', () => {

                describe('if file is a valid usm', () => {

                    describe('if rendering was successful', () => {

                        it('returns a download token, that is exactly 20 characters long and consists of [a-zA-Z0-9]', (done) => {

                            chai.request(server)
                                .post('/api/render/svg')
                                .end((err, res) => {
                                    should.not.exist(err)

                                    should.exist(res)
                                    res.should.have.status(200)

                                    should.exist(res.body.token)
                                    res.body.token.should.match(/^[a-zA-Z0-9]{20}$/gm)

                                    done()
                                })
                        })

                        it.skip('the file can be downloaded from /download/:token', (done) => {

                            done()
                        })

                        it.skip('the token is valid for exactly one download of the file', (done) => {

                            done()
                        })

                        it.skip('the file is deleted after one download and doesn\'t take up any disk space anymore', (done) => {

                            done()
                        })

                    })

                    describe.skip('if rendering failed', () => {
                        it('returns status 500 with an error message', (done) => {

                            done()
                        })
                    })

                })

                describe.skip('if file is no vaild usm', () => {
                    it('returns status 406 and an error message', (done) => {

                        done()
                    })
                })

            })

            describe.skip('if file is no valid xml', () => {

                it('returns status 406 and an error message', (done) => {

                    done()
                })
            })

        })

        // it('should respond with status 200', (done) => {
        //     chai.request(server)
        //         .get('/api/')
        //         .end((err, res) => {
        //             should.not.exist(err)
        //             should.exist(res)
        //             res.should.have.status(200)
        //             res.text.should.equal("ok")
        //             done()
        //         })
        // })

    })

})