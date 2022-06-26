import React from 'react';
import {View, Image} from 'react-native';
import stylesCustom from '../styles/styles';

export const Nothing = ({name, title, size, source}) => (
  <View style={[stylesCustom.center, stylesCustom.nothing]}>
    <Image source={source} style={stylesCustom.image} />
  </View>
);
