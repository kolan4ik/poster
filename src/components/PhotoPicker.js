import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permission from "expo-permissions";
import {
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

async function askForPermissions() {
  const { status } = await Permission.askAsync(Permission.CAMERA);

  if (status !== "granted") {
    Alert.alert("Ошибка", "Нету доступа");
    return false;
  }
  return true;
}

export const PhotoPicker = ({ onPick }) => {
  const [image, setImages] = useState(null);
  const takePhoto = async () => {
    const hasPermissions = await askForPermissions();
    if (!hasPermissions) {
      return;
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
    });

    setImages(img.uri);
    onPick(img.uri);
  };
  return (
    <View style={styles.wrapper}>
      <Button title="Сделать фото" onPress={takePhoto} />
      {image && <Image style={styles.images} source={{ uri: image }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  images: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});
