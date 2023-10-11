import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import ImageViewer from '../ImageViewer';

export default function ImageList({ data }: any) {

  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const toggleViewer = (imageUri: any) => {
    setSelectedImage(imageUri);
    setViewerVisible(!viewerVisible);
  };
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => { toggleViewer(item); }}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
      {viewerVisible && (
        <ImageViewer
          isVisible={viewerVisible}
          toggleViewer={() => { setViewerVisible(false); }}
          imageUri={selectedImage}
        />
      )}
    </>
  );
};
