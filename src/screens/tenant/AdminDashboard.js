import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
    ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import colors from '../../assets/colors/colors';
import { COLORS, FONTS, SIZES } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import RecentTransactions from './RecentTransactions';



const AdminDashboard = () => {
    const navigation = useNavigation();

    const [selectedBuilding, setSelectedBuilding] = React.useState(null)
    const { tenantBuildingList, getTenantBuildings, clearStateVariable, isAdmin,screenLoading
         } = React.useContext(GlobalContext);
    const [sum, setSum] = React.useState(0);
    React.useEffect(() => {
        //clearStateVariable();
        getTenantBuildings();
        console.log("tenantRoomOrderDetails",tenantBuildingList)
        total()
    }, [])

    const total = async () => {
        var sum = 0;
        console.log(sum,"sum")
        tenantBuildingList.forEach( b => {
            sum = sum + b.total_amount;
            console.log(sum,"sum")
        } 
        )
        setSum(sum);
        return sum;
    }


    function renderAmountOverAll() {

        return (
            <View style={styles.titlesWrapper}>
                {/* <Text style={styles.titlesSubtitle}>Food</Text> */}
                <Text style={styles.titlesTitle}>Total Income : ₹{sum}</Text>
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