import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../assets/colors/colors';

const SkeletionTenantRoomDetails = () => {



    return (
        <View>
        <View style={styles.headerWrapper}>
            <View style={styles.headerLeft}>
            <Text style={styles.title}>Tenant Details</Text>
            </View>
        </View>
        <View style={{paddingHorizontal:20}}>
            <ContentLoader
                speed={2}
                width={400}
                height={400}
                viewBox="0 0 400 400"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <Circle cx="10" cy="20" r="8" />
                <Rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
                <Circle cx="10" cy="50" r="8" />
                <Rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
                <Circle cx="10" cy="80" r="8" />
                <Rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
                <Circle cx="10" cy="110" r="8" />
                <Rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
                <Rect x="25" y="135" rx="5" ry="5" width="220" height="10" />
                <Rect x="25" y="165" rx="5" ry="5" width="220" height="10" />
                <Rect x="25" y="195" rx="5" ry="5" width="220" height="10" />
                <Circle cx="9" cy="140" r="8" />
                <Circle cx="9" cy="170" r="8" />
                <Circle cx="9" cy="200" r="8" />
            </ContentLoader>
        </View>
        </View>
    )
}

export default SkeletionTenantRoomDetails

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      headerLeft: {
        padding: 12,
        borderRadius: 10,
      },
      title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: colors.textDark,
      },
})