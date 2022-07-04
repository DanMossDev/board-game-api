const app = require("../app")
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const request = require('supertest')

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    db.end()
})

describe('/api/categories', () => {
    describe('GET requests', () => {
        describe('GET /api/categories', () => {
            test('happy path', () => {
                return request(app).get('/api/categories').expect(200).then(({body}) => {
                    expect(Array.isArray(body)).toBe(true)
                    expect(body.length).not.toBe(0)
                    body.forEach(object => {
                        expect(object.hasOwnProperty('slug')).toBe(true)
                        expect(object.hasOwnProperty('description')).toBe(true)
                    })
                })
            })
            test('bad path name', () => {
                return request(app).get('/api/categoriez').expect(400).then(({body}) => {
                    expect(body.msg).toBe('That is not a valid endpoint, please refer to documentation for a list of valid endpoints')
                })
            })
        })
    })
})