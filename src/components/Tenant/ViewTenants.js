import React from 'react';
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconToggle } from '../../utils';
import UserAvatar from '../UserAvatar';

const openDialScreen = (no) => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${no}`;
    } else {
      number = `tel:${no}`;
    }
    Linking.openURL(number);
  };


const UserItem = ({ item, navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchable} onPress={() =>                 
                navigation.navigate('TenantAdminDashboard', {
                  tenantId : item._id
                })}>
                <UserAvatar large style={styles.avatar} uri={item.avatar} />
                <View style={styles.captions}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text small style={styles.title}>
                            {item.name}
                        </Text>
                        <View style={styles.gender}>
                        <IconToggle
                                    set = "materialcommunityicons"
                                    name = "phone"
                                    color="#777777" size={15}
                                    onPress={() => openDialScreen(item.mobileNumber)}
                                />
                        </View>
                    </View>
                    <Text small style={styles.subtitle}>
                        {item.address}
                    </Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}

const ViewTenants = ({listProps}) => {
    return (
        <FlatList
            data={listProps.tenantDetailsList}
            renderItem={({ item, index }) => <UserItem item={item} navigation={listProps.navigation} />}
            keyExtractor={item => item._id}
            refreshing={listProps.refreshing}
            onRefresh={listProps.handleRefresh}
        />
    )
}

export default ViewTenants

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 22,
        paddingRight: 12,
        paddingBottom: 12,
        paddingTop : 20
    },
    avatar: {
        flex: 1,
        borderWidth: 2,
        aspectRatio: 1,
        borderRadius: 60
    },
    touchable: {
        flex: 1,
        flexDirection: 'row'
    },
    captions: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#313131',
        paddingBottom: 2,
        paddingLeft: 26
    },
    gender: {
        paddingBottom: 2,
        paddingRight: 8
    },
    subtitle: {
        color: '#B5B5B5',
        paddingTop: 2,
        paddingLeft: 26
    },
    phoneWrapper: {
        flexDirection: 'row',
        flexWrap : 'wrap',
        alignItems: 'center',
        paddingLeft: 26
    }
})