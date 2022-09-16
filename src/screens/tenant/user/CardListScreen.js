import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import Moment from 'react-moment';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../assets/colors/colors';
import { Loading } from '../../../components/common';
import { GlobalContext } from '../../../context/GlobalState';

const CardListScreen = () => {

  const [loader, setLoader] = React.useState(false);
  const { startPaytmTransaction, paytmTransactionResponse
    , screenLoading, setScreenLoading, getTenantRoomOrderDetails, tenantRoomOrderDetails } = useContext(GlobalContext);
  const [roomsList, setRoomsList] = React.useState([])
  const navigation = useNavigation();

  React.useEffect(() => {
    //clearStateVariable();
    getTenantRoomOrderDetails('P,F', 1);
    setRoomsList(tenantRoomOrderDetails)

    const willFocusSubscription = navigation.addListener('focus', () => {
      getTenantRoomOrderDetails('P,F', 1);
      setRoomsList(tenantRoomOrderDetails)
    }); return willFocusSubscription;

  }, [])







  return (

    <View style={styles.container}>
      <View style={styles.sliderContainer}>

          <View style={styles.slide} >
              <Card style={{ padding: 10, margin: 20, height: 200, width: 'auto', borderRadius: 25 }} backgroundColor="#fff"    >
                <View style={styles.card}>

                  <View style={styles.cardInfo1}>
                    {tenantRoomOrderDetails.totalAmount && (

                      <View style={styles.menuItem1}>

                        <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 10 }}>Amount Due</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 10 }}>₹ {tenantRoomOrderDetails.totalAmount[0] ? tenantRoomOrderDetails.totalAmount[0].count : 0}</Text>

                      </View>

                    )}
                    {/* <StarRating ratings={itemData.ratings} reviews={itemData.reviews} /> */}
                    {/* <View style={styles.menuItem}>
                      <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 13 }}>Plan</Text>
                      <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 13 }}>Yearly</Text>
                    </View> */}
                    <View style={styles.menuItem}>
                      <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 13 }}>Expires on</Text>
                      {tenantRoomOrderDetails.tenantDetails && (

                        <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 13 }}>

                          {tenantRoomOrderDetails.tenantDetails.map(m => (

                            <Moment format="D MMM YYYY" key={m._id} element={Text}>{m.end_at}</Moment>
                          ))}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                {tenantRoomOrderDetails.roomDetails && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PaymentDetails')
                    }>
                    {!screenLoading ?
                      <View>
                        {tenantRoomOrderDetails.roomDetails.map((item) => (
                          <View style={styles.orderWrapper}
                            key={item._id}
                          >
                            <Text style={styles.orderText}>Pay now</Text>
                            <Feather name="chevron-right" size={18} color={colors.black} />
                          </View>
                        ))}
                      </View>
                      :
                      <Loading size={'small'} />
                    }

                  </TouchableOpacity>
                )}
              </Card>
          </View>
      </View>

      {/* <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns= {2}
        /> */}
    </View>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sliderContainer: {
    height: 240,
    marginTop: 10,
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  menuItem: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  menuItem1: {
    flexDirection: 'column'
  },
  planDetails: {
    flexDirection: 'column'
  },
  cardInfo: {
    flex: 2,
    flexDirection: 'row',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    paddingLeft: 50
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  card: {
    flexDirection: 'column'
  },
  cardList: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
});