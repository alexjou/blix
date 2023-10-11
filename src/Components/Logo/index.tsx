import React from 'react';
import { Image } from 'react-native';

export const Logo = ({ styles }: any) => {
  return (
    <Image
      source={require('../../../assets/blixLogo.png')}
      style={{
        width: 250, height: 115, marginBottom: 50
      }}
    />
  );
};
