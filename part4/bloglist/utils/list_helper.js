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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}