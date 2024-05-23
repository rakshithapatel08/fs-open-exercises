const dummy = (blogs)=>{
    return 1;
}

const totalLikes = (blogs)=>{
  const likesArray = blogs.map((blog)=>blog.likes)

  const sumLikes = likesArray.reduce((sum,item)=>{
    return sum + item
  },0)

  return likesArray.length === 0
  ? 0
  : sumLikes
}

module.exports = {
    dummy, totalLikes
}