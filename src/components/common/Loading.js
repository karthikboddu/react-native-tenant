import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'


const Loading = ({ size }) => {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={size}/>
      </View>
    );
  };

  export { Loading };

const styles = {
    spinnerContainer: {
      flex: -1,
      marginTop: 12,
      marginBottom: 12
    }
  };
