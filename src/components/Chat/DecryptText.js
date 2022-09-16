import React from 'react';
import { StyleSheet, Text } from 'react-native';
import CryptoJS from "react-native-crypto-js";

const DecryptText = ({text}) => {
    let decryptedData = "";
    if (!(typeof text === 'string' && text.trim().length === 0)) {
        let bytes  = CryptoJS.AES.decrypt(text, '0123456789123456');
        decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }


  return (
      <Text style={styles.text}>{decryptedData}</Text>
  )
}

export default DecryptText

const styles = StyleSheet.create({
    text : {
        fontSize : 14,
        color: '#333333'
    }
})