import React from 'react';
import { Modal, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageViewer = ({ isVisible, toggleViewer, imageUri }: any) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.viewClose}>
          <TouchableOpacity onPress={toggleViewer}>
            <Icon name='close' size={30} color='white' />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    </Modal>
  );
};

export default ImageViewer;
