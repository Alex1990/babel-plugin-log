/* global describe, test, expect */
const _ = require('lodash')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const { transformFileSync } = require('@babel/core')
const plugin = require('../src')

function getTestName (testPath) {
  return path.basename(testPath).split('-').join(' ')
}

describe('babel-plugin-log', () => {
  const testPaths = glob.sync(path.join(__dirname, 'fixtures/*/'))

  for (const testPath of testPaths) {
    const testName = getTestName(testPath)
    const actualPath = path.join(testPath, 'actual.js')
    const expectedPath = path.join(testPath, 'expected.js')
    test(`should work with ${testName}`, () => {
      const expected = fs.readFileSync(expectedPath, 'utf8')
      const actual = transformFileSync(actualPath, {
        plugins: [[plugin]]
      }).code

      expect(_.trim(actual)).toBe(_.trim(expected))
    })
  }
})
