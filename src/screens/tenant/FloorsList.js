import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors/colors';
import { GlobalContext } from '../../context/GlobalState';

const FloorsList = ({ data,buildingId, navigation }) => {

    const item = data
    console.log(buildingId, "Data")
    const { screenLoading} = useContext(GlobalContext);
    if (screenLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#663399" />
          </View>
        );
      }
    return (
        <TouchableRipple
            onPress={() =>
                navigation.navigate('TenantRoomDetails', {
                    item: item._id, buildingItemId : buildingId
                })
            }
        >
            <View
                style={[
                    styles.popularCardWrapper,
                    {
                        marginTop: item.id == 1 ? 10 : 20,
                    },
                ]}>
                <View>
                    <View>
                        {/* <View style={styles.popularTopWrapper}>
                        <MaterialCommunityIcons
                            name="crown"
                            size={12}
                            color={colors.primary}
                        />
                        <Text style={styles.popularTopText}>top of the week</Text>
                        </View> */}
                        <View style={styles.popularTitlesWrapper}>
                            <Text style={styles.popularTitlesTitle}>
                                {item.room_name}
                            </Text>
                            <Text style={styles.popularTitlesWeight}>
                                <Fontisto name="persons" size={15} color={colors.textDark} />  {item.default_no_of_persons}
                            </Text>
                        </View>
                    </View>
                </View>
                {item.contractDetails && (

                    <View style={styles.popularCardRight}>
                        {/* <Ionicons name="add" size={20} color={colors.textDark} />
                    <Text style={styles.popularCardImage}>20,000</Text> */}
                        {/* <Image source={item.image} style={styles.popularCardImage} /> */}
                        {item.contractDetails.map(m => (

                            <View key={m.created_at}>
                                {m.orderDetails && (
                                    <View key={m.orderDetails.created_at}>
                                        {m.orderDetails[0]  ? (
                                            <View key={m.orderDetails[0].created_at}>
                                                <Text style={styles.popularTitlesTitle}>
                                                    {m.orderDetails[0].payment_status != 'C' ?
                                                        <MaterialIcons
                                                            name="pending"
                                                            size={20}
                                                            color={colors.pending}
                                                        /> :
                                                        <Ionicons
                                                            name="cloud-done-sharp"
                                                            size={20}
                                                            color={colors.done}
                                                        />
                                                    }
                                                </Text>

                                                <Text style={styles.popularTitlesTitle}>
                                                    ₹ {m.orderDetails[0].amount_paid}
                                                </Text>
                                            </View>
                                        ) : (<></> )}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}
                <View
                    style={[
                        styles.roomsListIcon,
                        {
                            backgroundColor: colors.primary,
                        },
                    ]}>
                    <Feather
                        name="chevron-right"
                        size={15}
                        style={{ alignSelf: 'center' }}
                        color={item.selected ? colors.black : colors.white}

                    />
                </View>
            </View>
        </TouchableRipple>
    )
}

export default FloorsList

const styles = StyleSheet.create({
    popularWrapper: {
        paddingHorizontal: 20,
        marginBottom: 30
    },
    popularTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#000',
    },
    popularCardWrapper: {
        backgroundColor: colors.white,
        borderRadius: 25,
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        height: 100,
    },
    popularTopWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    popularTopText: {
        marginLeft: 10,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
    },
    popularTitlesWrapper: {
        marginTop: 10,
    },
    popularTitlesTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: colors.textDark,
    },
    popularTitlesWeight: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: colors.textLight,
        // marginTop: 5,
    },
    popularCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: -20,
    },
    addPizzaButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    rating: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: colors.textDark,
        marginLeft: 5,
    },
    popularCardRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 80,
    },
    popularCardImage: {
        color: '#000',
        marginLeft: 5
    },
    roomsListIcon: {
        marginLeft: 23,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 26,
        height: 26,
        borderRadius: 26,
        marginBottom: 20,
    }
})
