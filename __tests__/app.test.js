const app = require("../app")
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const request = require('supertest')
require('jest-sorted')

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

                    expect(Object.keys(body).length).toBe(10)

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
                        votes: 1,
                        comment_count: 0
                    })
                })
            })
            test('Incorrect data type for review_id', () => {
                return request(app).get('/api/reviews/beans').expect(400).then(({body}) => {
                    expect(body.msg).toBe("Input of incorrect data type.")
                })
            })
            test('Correct data type but the entry does not exist', () => {
                return request(app).get('/api/reviews/99').expect(404).then(({body}) => {
                    expect(body.msg).toBe("Sorry, there is no review with that ID.")
                })
            })
        })
        describe('GET /api/reviews', () => {
            test('happy path', () => {
                return request(app).get('/api/reviews').expect(200).then(({body}) => {
                    expect(body.length).toBe(13)
                    body.forEach(review => {
                        expect(review).toEqual(expect.objectContaining({
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: expect.any(String),
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            review_body: expect.any(String),
                            designer: expect.any(String),
                            comment_count: expect.any(Number)
                        }))
                    })
                    expect(body[4].comment_count).toBe(3)
                })
            })
            test('Optional parameters - sort_by', () => {
                return request(app).get('/api/reviews?sort_by=votes').expect(200).then(({body}) => {
                    expect(body).toBeSortedBy('votes', {descending: true})
                })
            })
            test('Optional parameters - order', () => {
                return request(app).get('/api/reviews?order=asc').expect(200).then(({body}) => {
                    expect(body).toBeSortedBy('created_at')
                })
            })
            test('Optional parameters - category', () => {
                return request(app).get('/api/reviews?category=euro%20game').expect(200).then(({body}) => {
                    body.forEach(game => {
                        expect(game.category).toBe('euro game')
                    })
                })
            })
            test('Optional parameters - sort_by - invalid input', () => {
                return request(app).get('/api/reviews?sort_by=beans').expect(400).then(({body}) => {
                    expect(body.msg).toBe("Invalid sort_by; please refer to documentation.")
                })
            })
            test('Optional parameters - order - invalid input', () => {
                return request(app).get('/api/reviews?order=yes').expect(400).then(({body}) => {
                    expect(body.msg).toBe("Results must be ordered by ASC or DESC")
                })
            })
            test('Optional parameters - order - invalid but possible input', () => {
                return request(app).get('/api/reviews?category=funnygames').expect(200).then(({body}) => {
                    expect(body.length).toBe(0)
                })
            })
            test('Optional parameters - default case', () => {
                return request(app).get('/api/reviews').expect(200).then(({body}) => {
                    expect(body).toBeSortedBy('created_at', {descending: true})
                })
            })
        })
        describe('GET /api/reviews/:review_id/comments', () => {
            test('Happy path', () => {
                return request(app).get('/api/reviews/2/comments').expect(200).then(({body}) => {
                    expect(body.comments.length).toBe(3)
                    body.comments.forEach(comment => {
                        expect(comment).toEqual(expect.objectContaining({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String),
                            review_id: expect.any(Number)
                        }))
                    })
                })
            })
            test('Non existent review_id', () => {
                return request(app).get('/api/reviews/99/comments').expect(404).then(({body}) => {
                    expect(body.msg).toBe("Sorry, there is no review with that ID.")
                })
            })
            test('Incorrect review_id type', () => {
                return request(app).get('/api/reviews/twelve/comments').expect(400).then(({body}) => {
                    expect(body.msg).toBe("Input of incorrect data type.")
                })
            })
            test('Review exists but there are no comments', () => {
                return request(app).get('/api/reviews/1/comments').expect(200).then(({body}) => {
                    expect(body).toEqual({comments: []})
                })
            })
        })
        describe('GET /api/users', () => {
            test('Happy path', () => {
                return request(app).get('/api/users').expect(200).then(({body}) => {
                    expect(body.length).toBe(4) 
                    body.forEach(user => {
                        expect(user).toEqual(expect.objectContaining({
                            username: expect.any(String),
                            name: expect.any(String),
                            avatar_url: expect.any(String)
                        }))
                    })
                })
            })
        })
    })

    describe('PATCH requests', () => {
        describe('PATCH /api/reviews/:review_id', () => {
            test('Happy path', () => {
                const patchSend = {inc_votes: 10}
                
                return request(app).patch('/api/reviews/2')
                .expect(200)
                .send(patchSend)
                .then(({body}) => {
                    expect(body).toEqual({
                        review_id: 2,
                        title: 'Jenga',
                        designer: 'Leslie Scott',
                        owner: 'philippaclaire9',
                        review_img_url:
                          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                        review_body: 'Fiddly fun for all the family',
                        category: 'dexterity',
                        created_at: "2021-01-18T10:01:41.251Z",
                        votes: 15
                      }) 
                })
            })
            test('Body missing inc_votes', () => {
                return request(app).patch('/api/reviews/2').expect(400).send({beans: "Oo yes please"}).then(({body}) => {
                    expect(body.msg).toBe("Patch body must contain the number of incoming votes.")
                })
            })
            test('inc_votes wrong data type', () => {
                return request(app).patch('/api/reviews/2').expect(400).send({inc_votes: "eleven"}).then(({body}) => {
                    expect(body.msg).toBe("Input of incorrect data type.")
                })
            })
            test('Patch with a review_id that does not exist', () => {
                const patchSend = {inc_votes: 20}
                
                return request(app).patch('/api/reviews/99')
                .expect(404)
                .send(patchSend)
                .then(({body}) => {
                    expect(body.msg).toBe("Sorry, there is no review with that ID.")
                })
            })
            test('Patch with a review_id of invalid data type', () => {
                const patchSend = {inc_votes: 15}
                
                return request(app).patch('/api/reviews/ninetynine')
                .expect(400)
                .send(patchSend)
                .then(({body}) => {
                    expect(body.msg).toBe("Input of incorrect data type.")
                })
            })
        })
    })

    describe('POST requests', () => {
        describe('POST /api/reviews/:review_id/comments', () => {
            test('Happy path', () => {
                const postedComment = {username: "bainesface", body: "Yes it certainly is one of the games ever"}
                return request(app).post('/api/reviews/1/comments').expect(201).send(postedComment).then(({body}) => {
                    expect(body).toEqual({
                        comment_id: 7,
                        votes: 0,
                        created_at: expect.any(String),
                        author: "bainesface",
                        body: "Yes it certainly is one of the games ever",
                        review_id: 1
                    })
                })
            })
        })
    })
})