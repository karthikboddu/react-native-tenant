import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import { COLORS, FONTS, SIZES } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import HeaderProfileScreen from '../account/HeaderProfileScreen';


const AdminDashboard = () => {
    const navigation = useNavigation();

    const [selectedBuilding, setSelectedBuilding] = React.useState(null)
    const { tenantBuildingList, getTenantBuildings, clearStateVariable, isAdmin, screenLoading
    } = React.useContext(GlobalContext);

    const loopData = [
        { label: 'January', id: '1' },
        { label: 'Febraury', id: '2' },
        { label: 'March', id: '3' },
        { label: 'April', id: '4' },
        { label: 'May', id: '5' },
        { label: 'June', id: '6' },
        { label: 'July', id: '7' },
        { label: 'August', id: '8' },
        { label: 'September', id: '9' },
        { label: 'October', id: '10' },
        { label: 'November', id: '11' },
        { label: 'December', id: '12' },
    ];
    React.useEffect(() => {
        //clearStateVariable();
        getTenantBuildings();
    }, [])


    function renderAmountOverAll() {

        return (
            <View>
                {true ? (
                    <View style={styles.titlesWrapper}>
                        {/* <Text style={styles.titlesSubtitle}>Food</Text> */}
                        <Text style={styles.titlesTitle}>Total Income : ₹ {tenantBuildingList.totalAmount}</Text>
                    </View>
                ) : (
                    <View style={styles.loaderTitlesWrapper} >
                        <Text style={styles.titlesTitle}>Total Income : ₹
                            {/* <ContentLoader
                                speed={2}
                                width={400}
                                height={150}
                                viewBox="0 0 400 150"
                                backgroundColor="#f1e9e9"
                                foregroundColor="#fafafa"
                            >
                                <Rect x="24" y="11" rx="3" ry="3" width="100" height="24" />
                            </ContentLoader> */}
                        </Text>
                    </View>)}


            </View>
        )

    }

    function renderBuildingList() {

        const renderItem = ({ item }) => {

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

        const loaderRenderItem = ({ item }) => {

            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.radius,
                        marginRight: SIZES.padding,
                        marginLeft: 10,
                        width: 150,
                        ...styles.shadow
                    }}>
                    <View
                        style={{
                            backgroundColor: '#78ADF9',
                            marginRight: 20,
                            marginBottom: 15,
                            borderRadius: 20,
                            width: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedBuilding?.id == item._id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <ContentLoader
                            speed={2}
                            width={400}
                            height={150}
                            viewBox="0 0 400 150"
                            backgroundColor="#f1e9e9"
                            foregroundColor="#fafafa"

                        >
                            <Rect x="32" y="6" rx="24" ry="24" width="113" height="142" />
                        </ContentLoader>
                    </View>

                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                {screenLoading ? (
                    <FlatList
                        data={loopData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        renderItem={loaderRenderItem}
                        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                    />
                ) : (
                    <FlatList
                        data={tenantBuildingList.buildingsList}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => `${item._id}`}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                    />
                )}
            </View>
        )
    }



    return (
        <View style={styles.container}>

            {/* Header */}
            <SafeAreaView>
                <HeaderProfileScreen />
            </SafeAreaView>


            {/* Search */}
            <View style={styles.searchWrapper}>
                <Feather name="search" size={16} color={colors.textDark} />
                <View style={styles.search}>
                    <Text style={styles.searchText}>Search</Text>
                </View>
            </View>

            {renderAmountOverAll()}

            {/* List builings */}
            {renderBuildingList()}

            {/* Recent */}

            {/* <RecentTransactions /> */}

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
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    search: {
        flex: 1,
        marginLeft: 10,
        borderBottomColor: colors.textLight,
        borderBottomWidth: 2,
    },
    searchText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginBottom: 5,
        color: colors.textLight,
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
    loaderTitlesWrapper: {
        marginTop: 30,
    },
    titlesSubtitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: colors.textDark,
    },
    titlesTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: colors.primary,
        marginTop: 5,
    },
});