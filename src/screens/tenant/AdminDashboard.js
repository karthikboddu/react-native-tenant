import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Button
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../assets/colors/colors';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants'
import { GlobalContext } from '../../context/GlobalState';
import AllInOneSDKManager from 'paytm_allinone_react-native';

import endpoints from '../../endpoints';
import HeaderProfileScreen from '../account/HeaderProfileScreen';
import RecentTransactions from './RecentTransactions';
import { generatePaytmToken } from '../../services/tenant/tenantService';
import { useNavigation } from '@react-navigation/native';
import Main from './Main'

const AdminDashboard = () => {
    const navigation = useNavigation();

    const [selectedBuilding, setSelectedBuilding] = React.useState(null)
    const { tenantBuildingList, getTenantBuildings, clearStateVariable, isAdmin,screenLoading
         } = React.useContext(GlobalContext);

    React.useEffect(() => {
        //clearStateVariable();
        getTenantBuildings();
        console.log("tenantRoomOrderDetails",tenantBuildingList)
    }, [])

    const payNow = async () => {

        let orderId = '7688677868766734531211';
        let amount = 101;
        //getPaytmToken(orderId, amt);
        var raw = JSON.stringify({
            orderId: orderId,
            amt: amount,
        });
        const token = await generatePaytmToken("", raw);
        let resJson = await token.json();
        const txnToken = resJson.data?.body?.txnToken;
        console.log("gateway response1", resJson.data?.body);
        try {
            AllInOneSDKManager.startTransaction(
                orderId,
                endpoints.mId,
                txnToken,
                amount.toFixed(2),
                endpoints.callBackUrl + orderId,
                true,
                true,
                endpoints.urlScheme
            )
                .then((result) => {
                    console.log("gateway response", result);
                })
                .catch((err) => {
                    console.log("gateway error", err);
                });
        } catch (error) {
            console.log("try catch error", error)
        }
    }

    function renderAmountOverAll() {

        return (
            <View style={styles.titlesWrapper}>
                {/* <Text style={styles.titlesSubtitle}>Food</Text> */}
                <Text style={styles.titlesTitle}>Total Income : $55,000</Text>
            </View>
        )

    }

    function renderBuildingList() {

        const renderItem = ({ item }) => {
            //getTenantBuildings();
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedBuilding?.id == item._id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() =>

                        navigation.navigate('BuildingDetails', {
                            items: item._id,
                        })
                    }>
                    <View
                        style={{
                            backgroundColor: '#78ADF9',
                            marginRight: 20,
                            marginBottom: 15,
                            borderRadius: 20,

                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedBuilding?.id == item._id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={{ uri: item.building_image }}
                            resizeMode="contain"
                            style={{
                                width: 110,
                                height: 110,
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedBuilding?.id == item._id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.building_name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>

                <FlatList
                    data={tenantBuildingList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item._id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }


    if (screenLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#663399" />
          </View>
        );
      }




    return (
        <View>
            {renderAmountOverAll()}

            {/* List builings */}
            {renderBuildingList()}

            {/* Recent */}
            <RecentTransactions/>
            {/* <Main/> */}
            {/* <Button
            title="Create Payment"
            onPress={payNow}
            /> */}
        </View>
    )
}

export default AdminDashboard


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray
    },
    categoriesWrapper: {
        marginTop: 30,
    },
    categoriesTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        paddingHorizontal: 20,
    },
    categoriesListWrapper: {
        paddingTop: 15,
        paddingBottom: 20,
    },
    categoryItemWrapper: {
        backgroundColor: '#78ADF9',
        marginRight: 20,
        marginBottom: 15,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 10,
        elevation: 2,

    },
    categoryItemImage: {
        width: 110,
        height: 110,
        alignSelf: 'center',
        marginHorizontal: 20,
        overflow: 'hidden'
    },
    categoryItemTitle: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    categorySelectWrapper: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 26,
        height: 26,
        borderRadius: 26,
        marginBottom: 20,
    },
    categorySelectIcon: {
        alignSelf: 'center',
    },
    categoryItemDetails: {
        flexDirection: 'row'
    },
    categoryItemLocation: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#000'
    },
    categoryItemLocationIcon: {
        marginLeft: 20,
        paddingRight: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#000'
    },
    categoryItemDetailsAmount: {
        flexDirection: 'row'
    },
    categoryItemDetailsAmountIcon: {
        marginLeft: 20,
        paddingRight: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#000'
    },
    categoryItemDetailsAmountText: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#000'
    },
    titlesWrapper: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    titlesSubtitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: colors.textDark,
    },
    titlesTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        color: colors.primary,
        marginTop: 5,
    },
});