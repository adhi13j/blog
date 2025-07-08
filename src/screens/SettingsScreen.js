import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { SettingsContext } from "../context/SettingsContext";

const SettingsScreen = () => {
  const { baseURL, setBaseURL } = useContext(SettingsContext);
  const [input, setInput] = useState(baseURL);

  return (
    <View style={styles.container}>
      <Text>Current Base URL:</Text>
      <Text style={styles.url}>{baseURL}</Text>
      <TextInput
        label="New Base URL"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => setBaseURL(input)}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: { marginVertical: 20 },
  url: { marginBottom: 10, color: "blue" },
});

export default SettingsScreen;