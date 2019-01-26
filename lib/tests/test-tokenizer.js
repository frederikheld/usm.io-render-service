'use strict'

const tokenizer = require('../tokenizer')

const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiMatch = require('chai-match')
chai.use(chaiMatch)

const should = chai.should()

describe('tokenizer', () => {

    it('returns a string with the given length consisting of [a-zA-Z0-9]', () => {

        let singleCharToken = tokenizer.generateDownloadToken(1)
        singleCharToken.should.match(/^[a-zA-Z0-9]{1}$/gm)

        let shortTokens = []
        for (let i = 0; i < 10; i++) {
            shortTokens.push(tokenizer.generateDownloadToken(5))
        }

        for (let i in shortTokens) {
            shortTokens[i].should.match(/^[a-zA-Z0-9]{5}$/gm)
        }

        let longTokens = []
        for (let i = 0; i < 10; i++) {
            longTokens.push(tokenizer.generateDownloadToken(503))
        }

        for (let i in longTokens) {
            longTokens[i].should.match(/^[a-zA-Z0-9]{503}$/gm)
        }

    })

    it('returns an empty string if length 0 is given', () => {
        let emptyToken = tokenizer.generateDownloadToken(0)
        emptyToken.length.should.equal(0)
    })

    it.skip('returned characters are evenly distributed', () => {
        // TODO: test quality the random string generator
        // TODO: set minimum quality
    })

})