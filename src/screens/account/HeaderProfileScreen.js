import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Avatar,
  Title
} from 'react-native-paper';
import { GlobalContext } from '../../context/GlobalState';


const HeaderProfileScreen = ({ navigation }) => {

  const {userDetails,getUserDetails}  = useContext(GlobalContext);
     React.useEffect(() => {
    //clearStateVariable();
    		getUserDetails();
    },[])
    
    
    return (
    
         <View style={styles.headerWrapper}>
          {userDetails.photoUrl ? (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image 
            source={{uri: userDetails.photoUrl }}
            size={40}
            style={styles.profileImage}
          />
          </TouchableOpacity> ) : ( 
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image 
            source={require('../../assets/avatar.png')}
            size={40}
            style={styles.profileImage}
          />
          </TouchableOpacity>
          )}
          <View style={{marginLeft: 20}}>
            <Title style={[styles.caption, {
              marginTop:8,
              marginBottom: 5,
              
            }]}>Welcome, {userDetails.full_name}</Title>
          </View>

          </View>
    
    );

};
export default HeaderProfileScreen;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor : '#fff'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  caption: {
    fontSize :15
  }
  
  });
  
  
  
