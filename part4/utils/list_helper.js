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

const favouriteBlog = (blogs)=>{
    if(blogs.length === 0){
        return {}
    }
    let max = blogs[0].likes;
    let maxObject = blogs[0];

    blogs.forEach((blog) => {
        if(blog.likes > max)
            {
                max = blog.likes
                maxObject = blog
            }        
    });

    const result = {
        title:maxObject.title,
        author:maxObject.author,
        likes:maxObject.likes
    }
    return result;
}

module.exports = {
    dummy, totalLikes, favouriteBlog
}