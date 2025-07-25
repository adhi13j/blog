import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput} from 'react-native';
import { Context } from '../context/BlogContext';

const CreateScreen = ({navigation}) => {
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    const {addBlogPost} = useContext(Context)
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
        title='Create Blog Post'
        onPress={()=>{
          addBlogPost(title,content,()=>{navigation.navigate("IndexScreen")})
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

export default CreateScreen;