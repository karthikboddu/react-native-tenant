import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar, Caption,
  Text, Title, TouchableRipple
} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { default as Icon, default as MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import { GlobalContext } from '../../context/GlobalState';


const ProfileScreen = ({ navigation }) => {

  const {userDetails,getUserDetails}  = useContext(GlobalContext);
     React.useEffect(() => {
    		getUserDetails();
      },[])

  const { signOut,setDarkTheme } = React.useContext(GlobalContext);

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSectionProfile}>
        <View style={{ marginTop: 15, flexDirection : 'row'}}>
          {userDetails.photoUrl ? (
          <Avatar.Image 
            source={{uri: userDetails.photoUrl }}
            size={80}
          /> ) : ( 
          <Avatar.Image 
            source={require('../../assets/avatar.png')}
            size={80}
          />)}
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{userDetails.username}</Title>
            <Caption style={styles.caption}>@{userDetails.username}</Caption>
          </View>
        </View>
        <View style={{ justifyContent:'flex-start' ,marginLeft:60, marginTop:10}}>
                            <MaterialCommunityIcons.Button
                                name="account-edit"
                                size={25}
                                backgroundColor={colors.background}
                                color={colors.black}
                                onPress={() => navigation.navigate('EditProfile')}
      />
        </View>        
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userDetails.address}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userDetails.mobile_no}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userDetails.email}</Text>
        </View>
      </View>


      <View style={styles.menuWrapper}>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color={colors.primary} size={25}/>
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple> */}
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={colors.primary} size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={{}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color={colors.primary} size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color={colors.primary} size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
          <Ionicons name="settings-outline" color={colors.primary} size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('UserLoginActivity', {title: 'UserLoginActivity'})}>
          <View style={styles.menuItem}>
          <Feather name="activity" color={colors.primary} size={25} />
            <Text style={styles.menuItemText}>Activity</Text>
          </View>
        </TouchableRipple>        
        <TouchableRipple onPress={() => {signOut()}}>
          <View style={styles.menuItem}>
            <Icon 
                            name="exit-to-app" 
                            color={colors.primary}
                            size={25}
                            />
            <Text style={styles.menuItemText}>Sign Out</Text>
          </View>
        </TouchableRipple>
      </View>
      {/* <View>
      <Text style={ {color:colors.primary,alignItems:'center', fontSize: 20, paddingLeft: 10 }}>Karthik</Text>
      </View> */}
    </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSectionProfile: {
    paddingHorizontal: 30,
    marginBottom: 25,
    flexDirection: 'row',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
