import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import StarRating from './StarRating';

const CardCustom = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <View style={styles.cardIcon}>
            <Ionicons name="home-outline" size={45} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>{itemData.title}</Text>
          <Text numberOfLines={2} style={styles.cardDetails}>{itemData.description}</Text>
          <Text style={styles.cardTitle}>{itemData.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCustom;

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    paddingLeft:14,
    marginLeft:20,
    borderRadius:10,
    width:'auto',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor:'#78ADF9'
  },
  cardImgWrapper: {
    flex: 3,
    flexDirection: 'row'
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
  
    flexWrap:'wrap',
    padding: 10,
    
  },
  cardTitle: {
    fontSize:20,
    color:'#fff',
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 20,
    color: '#fff',
  },
  cardIcon : {
    paddingRight: 20
  }
});