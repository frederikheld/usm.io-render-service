'use strict'

const chai = require('chai')

const chaiFiles = require('chai-files')
chai.use(chaiFiles)

const file = chaiFiles.file
const directory = chaiFiles.dir

const should = chai.should()
const expect = chai.expect

const mockFs = require('mock-fs')

const mockFsExperiment = require('../mockfs.experiment')


describe('mockFsExperiment', () => {

    describe('mockFsExperiment.createDirectory()', () => {

        beforeEach(() => {
            mockFs({})
        })

        afterEach(() => {
            mockFs.restore()
        })

        it('can create an directory that didn\'t exist before', (done) => {

            const path = __dirname + '/downloads'

            expect(directory(path)).to.not.exist

            const mfe = new mockFsExperiment()
            mfe.createDirectory(path)

            expect(directory(path)).to.exist

            done()
        })

        it('can create a directory recursively (note: path has to be absolute!)', (done) => {

            const path = __dirname + '/downloads/public/things'

            expect(directory(path)).to.not.exist

            const mfe = new mockFsExperiment()
            mfe.createDirectory(path)

            expect(directory(path)).to.exist

            done()
        })

    })
})