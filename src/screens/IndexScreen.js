import React, { useEffect, useContext } from 'react';
import { StyleSheet, FlatList , View} from 'react-native';
import { Card, Title, IconButton } from 'react-native-paper';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, removeBlogPost, getBlogPost } = useContext(Context);

  useEffect(() => {
    getBlogPost();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPost();
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <FlatList
      data={state}
      keyExtractor={(post) => post.id.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card} onPress={() => navigation.navigate('ShowScreen', { id: item.id })}>
          <Card.Title
            title={item.title}
            subtitle={`ID: ${item.id}`}
            right={(props) => (
              <IconButton
                {...props}
                icon={() => <Feather name="trash" size={24} color="red" />}
                onPress={() => removeBlogPost(item.id)}
              />
            )}
          />
        </Card>
      )}
    />
  );
};
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <View style={{ flexDirection: 'row', marginRight: 10 }}>
        <IconButton
          icon={() => <Feather name="plus" size={30} />}
          onPress={() => navigation.navigate('CreateScreen')}
        />
        <IconButton
          icon={() => <Feather name="settings" size={28} />}
          onPress={() => navigation.navigate('SettingsScreen')}
        />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default IndexScreen;