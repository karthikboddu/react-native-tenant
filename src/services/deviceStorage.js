import AsyncStorage from "@react-native-async-storage/async-storage";

const deviceStorage = {
  async saveKey(key, valueToSave) {
    try {
      await AsyncStorage.setItem(key, valueToSave);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadJWT(key = 'id_token') {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        // this.setState({
        //   jwt: value,
        //   loading: false
        // });
        return value;
      } else {
        // this.setState({
        //   loading: false
        // });
        return null;
      }
    } catch (error) {
      console.log('AsyncStorage Error!: ' + error.message);
    }
  },

  async deleteJWT(key = 'id_token') {
    try{
      await AsyncStorage.removeItem(key)
      .then(
        () => {
          // this.setState({
          //   jwt: ''
          // })
        }
      );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;