import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import { Post } from "../components/Post";

export const PostList = ({ data, onOpen }) => {
  if (data.length === 0) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.textEmpty}>Постов пока нет</Text>
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  textEmpty: {
    fontFamily: "open-regular",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
});
