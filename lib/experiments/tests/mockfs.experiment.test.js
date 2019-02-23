'use strict'

const path = require('path')

const chai = require('chai')

const chaiFiles = require('chai-files')
chai.use(chaiFiles)

// const file = chaiFiles.file
const directory = chaiFiles.dir

// const should = chai.should()
const expect = chai.expect

const mockFs = require('mock-fs')

const MockFsExperiment = require('../mockfs.experiment')

describe('mockFsExperiment', () => {
    describe('mockFsExperiment.createDirectory(): create/restore mockFs in beforeEach()/afterEach()', () => {
        beforeEach(() => {
            mockFs({})
        })

        afterEach(() => {
            mockFs.restore()
        })

        it('can create an directory that didn\'t exist before', (done) => {
            const directoryPath = path.join(__dirname, 'downloads')

            expect(directory(path)).to.not.exist

            const mfe = new MockFsExperiment()
            mfe.createDirectory(directoryPath)

            expect(directory(directoryPath)).to.exist

            done()
        })

        it('can create a directory recursively (note: path has to be absolute!)', (done) => {
            const directoryPath = path.join(__dirname, 'downloads', 'public', 'things')

            expect(directory(directoryPath)).to.not.exist

            const mfe = new MockFsExperiment()
            mfe.createDirectory(directoryPath)

            expect(directory(directoryPath)).to.exist

            done()
        })
    })

    describe('mockFsExperiment.createDirectory(): create/restore MockFs in it()', () => {
        it('can create an directory that didn\'t exist before', (done) => {
            mockFs({})

            const directoryPath = path.join(__dirname, 'downloads')

            expect(directory(directoryPath)).to.not.exist

            const mfe = new MockFsExperiment()
            mfe.createDirectory(directoryPath)

            expect(directory(directoryPath)).to.exist

            mockFs.restore()

            done()
        })
    })
})
