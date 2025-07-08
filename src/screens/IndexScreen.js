import React, { useEffect } from 'react';
import { View, StyleSheet, Text , FlatList, Button , TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import { useContext } from 'react';
import {Feather} from "@expo/vector-icons"

const IndexScreen = ({navigation}) => {
  const {state , removeBlogPost , getBlogPost} = useContext(Context)
  useEffect(()=>{
    getBlogPost()
    navigation.addListener("didFocus" , ()=>{
      getBlogPost()
    })
    return ()=>{listener.remove()}
  },[])
  return (
    <View>
          <FlatList 
            data={state} 
            keyExtractor={(post) => post.id} 
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={()=>{navigation.navigate("ShowScreen",{id:item.id})}}> 
                  <View style={styles.row}>
                    <Text style={styles.title}>{item.title} - {item.id}</Text>
                    <TouchableOpacity onPress={()=>{removeBlogPost(item.id)}}>
                      <Feather style={styles.icon} name='trash' />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                )
            }}
          />
    </View>
  );
};
IndexScreen.navigationOptions = ({navigation}) =>{
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('CreateScreen')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  row :{
    flexDirection:"row" ,
    justifyContent:"space-between",
    borderTopWidth :1,
    paddingVertical:20,
    paddingHorizontal:10,
    borderColor:"gray"
  },
  title:{
    fontSize:18
  },
  icon:{
    fontSize:24
  }
});

export default IndexScreen;