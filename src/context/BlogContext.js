import { act } from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/json-server';
const BlogReducer =(state , actions) =>{
    switch (actions.type) {
        case "get_BlogPosts":
            return actions.payload.data.data
        case "add_BlogPost":
            return [...state , {
                id:Math.floor(Math.random()*99999),
                title : actions.payload.title,
                content:actions.payload.content
            }]
        case "remove_BlogPost":
                return state.filter((blogPost)=>blogPost.id !== actions.payload);
        case "edit_BlogPost":
            return state.map((post) => {
                if (post.id === actions.payload.id) {
                    return {
                        ...post,
                        title: actions.payload.title,
                        content: actions.payload.content
                    };
                }
                return post;
            });
        default:
            return state
    }
}
const getBlogPost =(dispatch) =>{
    return async () =>{
      //  console.log("await started")
        const data  = await jsonServer.request("/BlogPosts")
       // console.log("await ended")
       // console.log(data)
        dispatch({type:"get_BlogPosts",payload:{data}})
    }
}
const addBlogPost = (dispatch) =>{
    return async(title,content,callback) =>{
        await jsonServer.post("/BlogPosts",{title,content})
     //   dispatch({type : "add_BlogPost",payload:{title,content}})
       if (callback) { callback() }
    }
}
const removeBlogPost = (dispatch) =>{
    return (id) =>{dispatch({type : "remove_BlogPost" ,payload:id })}}

const editBlogPost = (dispatch) =>{
    return (title,content,id,callback) =>{
        dispatch({type : "edit_BlogPost" ,payload:{title,content,id} })
        if (callback){
        callback()}
    }
}
export const {Context , Provider} = createDataContext(BlogReducer , {addBlogPost,removeBlogPost,editBlogPost,getBlogPost} , [])