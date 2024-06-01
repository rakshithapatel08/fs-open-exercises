const lodash = require('lodash');

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

const mostBlogs = (blogs)=>{
    if(blogs.length === 0){
        return {}
    }
    const countBloggers = (lodash.countBy(blogs,"author"))
    let countBlogsArray=[];
    for (const bloggs in countBloggers) {
       countBlogsArray.push({author:bloggs,blogs:countBloggers[bloggs]})
    }
    let max = 0;
    let maxObj = {}
    countBlogsArray.forEach((b)=>{
        if(b.blogs>max){
            max = b.blogs
            maxObj={
                author:b.author,
                blogs:b.blogs
            }
        }
    })
return maxObj
}

const mostLikes = (blogs)=>{
    if(blogs.length === 0){
        return {}
    }
    const likesByAuthor = blogs.reduce((acc, blog) => {
        if (acc[blog.author]) {
          acc[blog.author] += blog.likes;
        } else {
          acc[blog.author] = blog.likes;
        }
        return acc;
      }, {})
      let likesBlogsArray = [];
      for (const bloggs in likesByAuthor) {
        likesBlogsArray.push({author:bloggs,likes:likesByAuthor[bloggs]})
     }

      let max = 0;
      let maxObj = {}
      likesBlogsArray.forEach((b)=>{
          if(b.likes>max){
            max=b.likes
              maxObj={
                  author:b.author,
                  likes:b.likes
              }
          }
      })
      console.log(maxObj)
  return maxObj    
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}