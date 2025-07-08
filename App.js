import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import React from 'react';
import { Provider } from './src/context/BlogContext';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
const Navigator = createStackNavigator({
  IndexScreen:IndexScreen ,
  ShowScreen:ShowScreen,
  CreateScreen:CreateScreen,
  EditScreen:EditScreen
},{
  initialRouteName:"IndexScreen",
  defaultNavigationOptions:{
    title:"Venkata app",
    headerTitleAlign:"center",
    headerTintColor:"blue"
  }
})

const App =  createAppContainer(Navigator)
export default () =>{
  return <Provider><App/></Provider>;
}