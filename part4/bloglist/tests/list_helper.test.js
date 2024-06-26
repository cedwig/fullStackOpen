const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const listWithNoBlog = []

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 36)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    assert.strictEqual(result, 0)
  })


})

describe('favouriteBlog', () => {


  test('when list has only one blog, return same blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when list has multiple blogs, return first blog with highest likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, listWithMultipleBlogs[2])
  })

  test('returns undefined when empty list is given', () => {
    const result = listHelper.favoriteBlog(listWithNoBlog)
    assert.deepStrictEqual(result, undefined)
  })
})

describe('mostBlogs', () => {

  test('when list has only one blog, return its author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, { authorWithMostBlogs: 'Edsger W. Dijkstra', totalBlogs: 1 })
  })

  test('when list has multiple blogs, return author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, { authorWithMostBlogs: 'Robert C. Martin', totalBlogs: 3 })
  })

  test('when list is empty return undefined author and 0 totalblogs', () => {
    const result = listHelper.mostBlogs(listWithNoBlog)
    assert.deepStrictEqual(result, { authorWithMostBlogs: undefined, totalBlogs: 0 })
  })
})

describe('mostLikes', () => {
  test('when list has only one blog, return its author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, { authorWithMostLikes: 'Edsger W. Dijkstra', totalLikes: 5 })
  })

  test('when list has multiple blogs, return author with most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, { authorWithMostLikes: 'Edsger W. Dijkstra', totalLikes: 12 })
  })

  test('when list is empty retun undefined author and 0 totalLikes', () => {
    const result = listHelper.mostLikes(listWithNoBlog)
    assert.deepStrictEqual(result, { authorWithMostLikes: undefined, totalLikes: 0 })
  })
})