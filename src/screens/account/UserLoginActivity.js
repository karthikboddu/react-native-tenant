import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalContext } from '../../context/GlobalState';

const UserLoginActivity = () => {

    const {userLoginActivity,getUserLoginActivity}  = useContext(GlobalContext);
    useEffect(() => {
        getUserLoginActivity() 

      },[]);

    return (
        <ScrollView 
        style={styles.container}
        >
        {userLoginActivity.map(loginDetails => {

          return  (<View style={styles.item} key={loginDetails.id}>
                <View style={styles.itemLeft}>
                    <View style={styles.square}></View>
                    <Text style={styles.itemText}>Ip Address : {loginDetails.ipAddress}</Text>
                    <Text style={styles.itemText}>Devices : {loginDetails.device}</Text>
                </View>
                <View style={styles.circular}>

                </View>
            </View>)
        })}
        </ScrollView>
    )
}

export default UserLoginActivity

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    square:{
        width:24,
        height:24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },  
    itemText:{
        maxWidth: 'auto',
        color: 'black',
    },
    circular:{
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },


});
