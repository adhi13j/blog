import React , {useContext} from 'react';
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native';
import { Context } from '../context/BlogContext';
import {EvilIcons} from "@expo/vector-icons"

const ShowScreen = ({navigation}) => {
    const {state} = useContext(Context)
    const id = navigation.getParam("id")
    const blogPost = state.find((post) => post.id === id)
  return (
    <View>
      <Text>blog id : {id}</Text>
      <Text>blog title : {blogPost.title}</Text>
      <Text>blog content : {blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({navigation}) => {
    const id = navigation.getParam("id")
  return {
    headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('EditScreen',{id})}>
          <EvilIcons name="pencil" size={50} />
        </TouchableOpacity>
      )
  }
}
const styles = StyleSheet.create({
  
});

export default ShowScreen;