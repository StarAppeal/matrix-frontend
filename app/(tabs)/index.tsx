import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/GarfieldCharakter.webp');

import * as ImagePicker from 'expo-image-picker';
import {RestService} from '@/services/RestService';
import useService from '@/hooks/useService';

export default function Index() {
  const {data, loading, error} = useService(RestService.fetchAllUser);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  console.log(data);
  return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage}/>
        </View>
        <View style={styles.footerContainer}>
          {loading && <ActivityIndicator/>}
          {error && <Text>Error: {error.message}</Text>}
          {data && (
              <Text>
                {data.users.map((item) => item.name).join('; ')}
              </Text>
          )}
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
          <Button label="Use this photo"/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
