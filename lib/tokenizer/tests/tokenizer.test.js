'use strict'

const tokenizer = require('../tokenizer')

const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiMatch = require('chai-match')
chai.use(chaiMatch)

const should = chai.should()

describe('tokenizer.generateDownloadToken(n)', () => {
    context('called without parameter n', () => {
        let token

        it('returns a token', () => {
            token = tokenizer.generateDownloadToken()
            should.exist(token)
        })

        describe('the token', () => {
            it('is exactly 20 characters long', () => {
                token.length.should.equal(20)
            })

            it('consists only of [a-zA-Z0-9]', () => {
                token.should.match(/^[a-zA-Z0-9]*$/gm)
            })
        })
    })

    context('called with parameter n', () => {
        describe('the token', () => {
            it('is exactly n characters long', () => {
                // token consisting of a single character:
                let singleCharToken = tokenizer.generateDownloadToken(1)
                singleCharToken.length.should.equal(1)

                // short token:
                let shortToken = tokenizer.generateDownloadToken(5)
                shortToken.length.should.equal(5)

                // long token:
                let longToken = tokenizer.generateDownloadToken(1000)
                longToken.length.should.equal(1000)
            })

            it('consists only of [a-zA-Z0-9]', () => {
                // take 10 random samples of short tokens
                // and check character match:

                let shortTokens = []
                for (let i = 0; i < 10; i++) {
                    shortTokens.push(tokenizer.generateDownloadToken(5))
                }

                for (let i in shortTokens) {
                    shortTokens[i].should.match(/^[a-zA-Z0-9]*$/gm)
                }

                // take 10 random samples of long tokens
                // and check character match.

                let longTokens = []
                for (let i = 0; i < 10; i++) {
                    longTokens.push(tokenizer.generateDownloadToken(1000))
                }

                for (let i in longTokens) {
                    longTokens[i].should.match(/^[a-zA-Z0-9]*$/gm)
                }
            })

            context('n = 0 given', () => {
                describe('the token', () => {
                    it('is not undefined', () => {
                        let emptyToken = tokenizer.generateDownloadToken(0)
                        should.exist(emptyToken)
                    })
                    it('is an empty string', () => {
                        let emptyToken = tokenizer.generateDownloadToken(0)
                        emptyToken.length.should.equal(0)
                        emptyToken.should.equal('')
                    })
                })
            })
        })
    })

    it('returns an empty string if length 0 is given', () => {
        let emptyToken = tokenizer.generateDownloadToken(0)
        emptyToken.length.should.equal(0)
    })

    it('returns a different token with every call', () => {
        // create sample tokens:
        let tokens = []
        for (let i = 0; i < 10; i++) {
            tokens.push(tokenizer.generateDownloadToken())
        }

        // compare tokens:
        tokens.forEach((item, index) => {
            tokens.lastIndexOf(item).should.equal(index)
        })

        // NOTE: This test could fail in theory, since the
        // tokens are generated independently and therefore
        // not checked against a database of already generated
        // tokens. The mathematical probability for this event
        // is really low though!
    })

    it('TODO: returned characters are evenly distributed', () => {
        // TODO: test quality the random string generator
        // TODO: set minimum quality
    })
})
