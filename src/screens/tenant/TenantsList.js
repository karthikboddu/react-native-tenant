import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import {
    ActivityIndicator,
    FlatList, Linking, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors/colors';
import { SIZES } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import endpoints from '../../endpoints';
import deviceStorage from '../../services/deviceStorage';
import { IconToggle } from '../../utils';

const TenantsList = (route) => {

    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(1);
    const [itemId, setItemId] = React.useState(0);
    const [loader, setLoader] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const { screenLoading, setScreenLoading, isAdmin } = React.useContext(GlobalContext);

    const getData = async () => {

        const accessToken = await deviceStorage.loadJWT();
        const apiResponse = await fetch(
            `${endpoints.apiUrl}` + `${endpoints.tenantsList}` + `?` + `buildingId=` + `${route.route.params?.items}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        }
        );
        const res = await apiResponse.json();
        setLoading(false);
        setData(res.data);
    };


    useEffect(() => {

        let isSubscribed = true
        if (isSubscribed) {
            getData();
        }
        return () => isSubscribed = false
    }, []);


    React.useEffect(() => {
        return () => {
            setData([]);
        }
    }, []);

    const openDialScreen = (no) => {
        let number = '';
        if (Platform.OS === 'ios') {
          number = `telprompt:${no}`;
        } else {
          number = `tel:${no}`;
        }
        Linking.openURL(number);
      };


    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={getNextPageData}
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {loading ? (
                        <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };

    const getNextPageData = () => {
        getData()
    }

    function renderTenantsList() {
        const renderItem = ({ item }) => {
            if (!item) {
                return (<></>);
            }
            return (

                <TouchableRipple key={item._id} onPress={() => navigation.navigate('TenantRoomDetails', {
                    item: item.floor_room_id,
                })}>
                    <View
                        style={[
                            styles.popularCardWrapper
                        ]}>

                        <View
                            style={[
                                styles.popularCardWrapperAmount
                            ]}>

                            <View style={styles.popularTitlesWrapper}>
                                <IconToggle 
                                    name="user-o"
                                    set= "FontAwesome"
                                    color="#777777"
                                    size={20}
                                />
                                <Text style={styles.popularTitlesTitle} >
                                    {item.tenant_id.full_name}
                                </Text>

                            </View>

                            <View style={styles.popularTitlesWrapper}>
                                <IconToggle
                                        set = "FontAwesome"
                                        name = "map-marker"
                                        color="#777777" size={20}
                                />
                                <Text style={styles.popularTitlesTitle}>
                                    {item.tenant_id.address}
                                </Text>
                            </View>

                            <View style={styles.popularTitlesWrapper}>
                                <IconToggle
                                    set = "materialcommunityicons"
                                    name = "phone"
                                    color="#777777" size={20}
                                    onPress={() => openDialScreen(item.tenant_id.mobile_no)}
                                />
                                <Text style={styles.popularTitlesTitle}>
                                    {item.tenant_id.mobile_no}
                                </Text>
                            </View>


                            <View style={styles.popularTitlesWrapper}>
                                    <Ionicons
                                        name="time-outline"
                                        size={20}
                                        color={colors.done}
                                    />
                                <Text style={styles.popularTitlesTitle}>
                                    <Moment format="D MMM YYYY" key={item._id} element={Text}>{item.updated_at}</Moment>
                                </Text>
                            </View>
                        </View>

                    </View>
                </TouchableRipple>

            )
        }

        return (

            <View>
                <FlatList
                    data={data.tenants}
                    onEndReachedThreshold={0.5}
                    // onEndReached={() => setPage(page + 1)}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item ? `${item._id}` : 0}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                    ListFooterComponent={renderFooter}
                />
            </View>
        )

    }




    return (
        <SafeAreaView>


            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.headerLeft}>
                        <Feather name="chevron-left" size={12} color={colors.textDark} />
                    </View>
                </TouchableOpacity>

            </View>

            <View style={styles.popularWrapper}>

                <Text style={styles.popularTitle}>Tenant Lists</Text>

                {renderTenantsList()}



            </View>
        </SafeAreaView>
    )
}

export default TenantsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerLeft: {
        borderColor: colors.textLight,
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
    },
    popularWrapper: {
        paddingHorizontal: 20,
        marginBottom: 30
    },
    popularTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#000',
        marginTop:10,
        marginBottom: 10
    },
    popularCardWrapper: {
        backgroundColor: colors.white,
        borderRadius: 25,
        
        marginBottom: 10,
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
        
    },
    popularCardWrapperAmount: {
        borderRadius: 25,

        paddingLeft: 20,
        flexDirection: 'column',
        overflow: 'hidden',
        height: 180,
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
        flexDirection: 'row',
        flexWrap : 'wrap',
        alignItems: 'center',
    },
    popularTitlesWrapper1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    popularTitlesTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: colors.textDark,
        alignItems: 'center',
        flexWrap : 'wrap'
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
        //marginTop: 20,
    },
    popularCardImage: {
        color: '#000',
        marginLeft: 5
    },
    roomsListIcon1: {
        marginLeft: 23,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 26,
        height: 26,
        borderRadius: 26,
        marginBottom: 20,
    },
    orderWrapper: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 10,
        backgroundColor: colors.orange,
        borderRadius: 50,
        width: 80,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        paddingLeft: 5,
        marginRight: 10,
        alignItems: 'center'
    },
    infoItemTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: colors.textLight,
        paddingRight: 10,
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})