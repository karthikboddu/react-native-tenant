import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator, Animated, Dimensions,
  View
} from 'react-native';
import LottieView from 'lottie-react-native';

const Overlay = ({ isShow = false }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true 
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true 
        }),
      ]),
      {
        iterations: 100,
      }
    ).start();
  }, []);

  if (isShow) {
    return (
      <View
        style={{
          position: 'absolute',
          flex: 1,
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            width: '100%',
            height: 200,
            display: 'flex',
            alignSelf: 'center',
            opacity: fadeAnim,
          }}
        >
              
         {/* <ActivityIndicator size="large" color="#000" />
         <Text style={{ color: '#FFF', fontSize: 22, textAlign: 'center' }}>
            Loading Please Wait...
          </Text> */}
           <LottieView source={require('../assets/97930-loading.json')} autoPlay loop />
        </Animated.View>
      </View>
    );
  } else {
    return null;
  }
};

export default Overlay;
