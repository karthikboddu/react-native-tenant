import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const UserAvatar = ({ uri, style, small, large }) => {
    return (
        <View style={[styles.container, (small) ? styles.smallContainer : null, (large) ? styles.largeContainer : null]}>
            <View style={styles.thumbnail}></View>
            {uri ? (
                <Image
                    style={[styles.avatar, (small) ? styles.smallAvatar : null, (large) ? styles.largeAvatar : null, style]}
                    source={{ uri: uri }} />

            ) : (
                <Image
                    style={[styles.avatar, (small) ? styles.smallAvatar : null, (large) ? styles.largeAvatar : null, style]}
                    source={require('../assets/avatar.png')} />
            )}
        </View>
    )
}

export default UserAvatar

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 16,
        aspectRatio: 1
    },
    thumbnail: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        borderRadius: 9,
        backgroundColor: '#F5F5F5'
    },
    smallContainer: {
        width: 1.28,
    },
    largeContainer: {
        width: 50,
        paddingLeft : 10
    },
    avatar: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8
    },
    smallAvatar: {
        borderRadius: 6
    },
    largeAvatar: {
        borderRadius: 10
    }
})