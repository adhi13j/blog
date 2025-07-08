import React, { useContext, useState ,useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput} from 'react-native';
import { Context } from '../context/BlogContext';

const EditScreen = ({navigation}) => {
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    const {state , editBlogPost} = useContext(Context)
    const id = navigation.getParam("id")
    const blogPost = state.find((post) => post.id === id)
    
    useEffect(() => {
        if (blogPost) {
        setTitle(blogPost.title);
        setContent(blogPost.content);
        }
    }, [blogPost]);
  return (
    <View>
        <Text style = {styles.label}>Title :</Text>
        <TextInput 
        style = {styles.input}
        value={title}
        onChangeText={(text)=>{setTitle(text)}}
        placeholder='Title'/>
        <Text style = {styles.label}>Content :</Text>
        <TextInput 
        style = {styles.input}
        value={content}
        onChangeText={(text)=>{setContent(text)}}
        placeholder='Content'/>
        <Button 
        title='Edit Blog Post'
        onPress={()=>{
          editBlogPost(
            title,
            content,
            blogPost.id,
            ()=>{navigation.navigate("IndexScreen")})
        }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  input:{
    fontSize:18,
    borderWidth:1,
    borderColor:"Black",
    padding:5,
    margin : 5,
},
label:{
    fontSize:20 , 
    marginBottom:10,
    marginLeft:5
}
});

export default EditScreen;