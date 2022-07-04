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
        describe('GET /api/reviews/:review_id', () => {
            test('happy path', () => {
                return request(app).get('/api/reviews/1').expect(200).then(({body}) => {
                    expect(Array.isArray(body)).toBe(false)
                    expect(typeof body).toBe('object')

                    expect(Object.keys(body).length).toBe(9)

                    expect(body).toEqual({
                        review_id: 1,
                        title: 'Agricola',
                        designer: 'Uwe Rosenberg',
                        owner: 'mallionaire',
                        review_img_url:
                          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                        review_body: 'Farmyard fun!',
                        category: 'euro game',
                        created_at: "2021-01-18T10:00:20.514Z",
                        votes: 1
                    })
                })
            })
            test('Incorrect data type for review_id', () => {
                return request(app).get('/api/reviews/beans').expect(400).then(({body}) => {
                    expect(body.msg).toBe("Review ID of incorrect data type. Did you mean to enter an integer?")
                })
            })
            test('Correct data type but the entry does not exist', () => {
                return request(app).get('/api/reviews/99').expect(404).then(({body}) => {
                    expect(body.msg).toBe("Sorry, there is no review with that ID.")
                })
            })
        })
        describe('GET /api/users', () => {
            test('Happy path', () => {
                
            })
        })
    })
})