'use strict'

let request = require('supertest')

describe('supertest: server is running', () => {

    let server

    beforeEach(() => {
        server = require('../server')
    })

    afterEach(() => {
        server.close()
    })

    it('should respond with status 200 to /', (done) => {
        request(server)
            .get('/')
            .expect(200, done)
    })
})