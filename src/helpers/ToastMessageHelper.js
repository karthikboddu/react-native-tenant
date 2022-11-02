import Toast from 'react-native-toast-message';


export async function showToast (errorType, message1 , message2) {
    Toast.show({
      type: errorType,
      text1: message1,
      text2: message2,
      position: 'bottom',
      bottomOffset:60
    });
  }