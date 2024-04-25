const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined
  return blogs.reduce((acc, blog) => {
    return (acc.likes > blog.likes) ? acc : blog
  })
}

const mostBlogs = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    if (blog.author in authors) {
      authors[blog.author].blogs += 1
    } else {
      authors[blog.author] = { blogs: 1 }
    }
  })

  let totalBlogs = 0
  let authorWithMostBlogs
  for (let author in authors) {
    if (authors[author].blogs > totalBlogs) {
      totalBlogs = authors[author].blogs
      authorWithMostBlogs = author
    }
  }
  return { authorWithMostBlogs, totalBlogs }
}

const mostLikes = (blogs) => {

  let totalLikes = 0
  let authorWithMostLikes
  blogs.forEach(blog => {
    if (blog.likes > totalLikes) {
      totalLikes = blog.likes
      authorWithMostLikes = blog.author
    }
  })
  return { authorWithMostLikes, totalLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}