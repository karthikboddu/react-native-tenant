import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Title
} from 'react-native-paper';
import { COLORS } from '../../constants';
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
          <Avatar.Image 
            source={{uri: userDetails.photoUrl }}
            size={40}
            style={styles.profileImage}
            onPress={() => navigation.navigate('ProfileScreen')}
          /> ) : ( 
          <Avatar.Image 
            source={require('../../assets/avatar.png')}
            size={40}
            style={styles.profileImage}
            onPress={() => navigation.navigate('ProfileScreen')}
          />)}
          <View style={{marginLeft: 20}}>
            <Title style={[styles.caption, {
              marginTop:15,
              marginBottom: 5,
              
            }]}>Welcome, {userDetails.full_name}</Title>
          </View>

          </View>
    
    );

};
export default HeaderProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  
  });
  
  
  
