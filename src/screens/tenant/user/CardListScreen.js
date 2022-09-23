import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../../assets/colors/colors';
import CardCustom from '../../../components/Card';
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




const data = {
  totalAmount : tenantRoomOrderDetails.totalAmount ? (tenantRoomOrderDetails.totalAmount[0] ? tenantRoomOrderDetails.totalAmount[0].count : 0) : 0,
  endAt : tenantRoomOrderDetails.tenantDetails ? tenantRoomOrderDetails.tenantDetails[0].end_at : '',
  buildingName : tenantRoomOrderDetails.buildingDetails ? tenantRoomOrderDetails.buildingDetails[0].building_name : "Hey"
  };


  return (

    <View style={styles.container}>
          {!screenLoading ? (
          <CardCustom itemData = {data}/>
            ) : (
              <Loading size={'small'} />
            )}

    </View>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuItem: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  menuItem1: {
    flexDirection: 'column'
  },
  menuItem2: {
    flexDirection: 'row'
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