'use strict'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

chai.use(chaiHttp)

describe('chaiHttp: server is running', () => {

    let server

    beforeEach(() => {
        server = require('./../server')
    })

    afterEach(() => {
        server.close()
    })

    it('should respond with status 200 to /', (done) => {
        chai.request(server)
            .get('/')
            .end((error, response) => {
                should.not.exist(error)
                should.exist(response)
                response.should.have.status(200)
                // response.body.should.equal("ok")
                done()
            })
    })
})