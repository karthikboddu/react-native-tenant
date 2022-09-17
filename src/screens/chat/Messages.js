import React, { useContext, useEffect } from 'react';
import Moment from 'react-moment';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CryptoJS from "react-native-crypto-js";
import ContactsFloatingIcon from '../../components/Chat/ContactsFloatingIcon';
import DecryptText from '../../components/Chat/DecryptText';
import { GlobalContext } from '../../context/GlobalState';
// import {
//   Card, Container, PostTime, TextSection, UserImg, UserImgWrapper, UserInfo, UserInfoText,
//   UserName
// } from '../../styles/MessageStyles';

const MessagesData = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: 'https://firebasestorage.googleapis.com/v0/b/react-native--signin-eb4b7.appspot.com/o/photos%2Fa88e6519-0f01-45a4-93a3-669e82093c811658467084067.jpg?alt=media&token=fce04356-2e2d-404e-8388-2f9ab1fea44d',
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: 'https://firebasestorage.googleapis.com/v0/b/react-native--signin-eb4b7.appspot.com/o/photos%2Fa88e6519-0f01-45a4-93a3-669e82093c811658467084067.jpg?alt=media&token=fce04356-2e2d-404e-8388-2f9ab1fea44d',
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: 'https://firebasestorage.googleapis.com/v0/b/react-native--signin-eb4b7.appspot.com/o/photos%2F86a03747-2f82-4725-8e59-2a2393c421431658601512548.jpg?alt=media&token=c3b38c08-8fc2-43d4-9277-b6bc8382f3da',
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: 'https://firebasestorage.googleapis.com/v0/b/react-native--signin-eb4b7.appspot.com/o/photos%2F86a03747-2f82-4725-8e59-2a2393c421431658601512548.jpg?alt=media&token=c3b38c08-8fc2-43d4-9277-b6bc8382f3da',
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: 'https://firebasestorage.googleapis.com/v0/b/react-native--signin-eb4b7.appspot.com/o/photos%2F86a03747-2f82-4725-8e59-2a2393c421431658601512548.jpg?alt=media&token=c3b38c08-8fc2-43d4-9277-b6bc8382f3da',
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];


// const socket = SocketIOClient('http://localhost:8000');

// socket.on('connect', () => console.log('connected'));

// socket.on('disconnect', () => console.log('disconnected'));

const Messages = ({navigation}) => {

  const {fetchAllTenantLastConversations, tenantLastConversations, fetchAllTenantList} = useContext(GlobalContext);

  useEffect(() => {
    fetchAllTenantLastConversations()
    fetchAllTenantList()
    console.log(tenantLastConversations,"tenantLastConversations   ");
    decryptJsonData()
    
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchAllTenantLastConversations()
    }); return willFocusSubscription;

  },[])
  const [data, setData] = React.useState({
    name : "",
    room : "",
    isValid : false
  })

  const decryptJsonData = () => {
    let resultData = [];
    if (tenantLastConversations.length > 0) {
    tenantLastConversations.conversations.forEach(element => {
      var list = {};
      list = element;
      console.log(list,"Data**************")
      list.text = decryptText(element.text);
      resultData.push(list);
    });
    }
  
    return resultData;
  
  }
  
  const decryptText = (text) => {
    console.log(text,"cipter")
    let bytes  = CryptoJS.AES.decrypt(text, '0123456789123456');
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData,"decipter")
    return decryptedData;
  }
  

    return (
      <View style={styles.container}>
        <FlatList 
          data={tenantLastConversations.conversations}
          keyExtractor={item=>item._id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ChatScreen', {id: item.user._id, fromUserId : item.from_tenant_id, parentId : item.parentId, user : item.user})}>
              <View  style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                  <Image
                  style={styles.userImg} 
                  source={
                    item.user.avatar
                    ? { uri: item.user.avatar }
                    : require("../../assets/icon-square.png")
                    }
                  />
                </View>
                <View style ={styles.textSection}>
                  <View style = {styles.userInfoText}>
                    <Text style = {styles.userName}>{item.user.name}</Text>
                    <Text style = {styles.postTime}>
                      <Moment fromNow element={Text}>{item.updatedAt}</Moment>
                    </Text>
                  </View>
                  <DecryptText text={item.lastMessage}/>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <ContactsFloatingIcon fromUserId = { tenantLastConversations.conversations &&  tenantLastConversations.conversations[0] ?  tenantLastConversations.conversations[0].from_tenant_id: null}/>
      </View>
    );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  userInfo : {
    flexDirection  : 'row',
    justifyContent : 'space-between'
  },
  userImgWrapper : {
    paddingTop : 15,
    paddingBottom :15
  },
  userImg : {
    width : 50,
    height :50,
    borderRadius : 25
  },
  textSection : {
    flexDirection : 'column',
    justifyContent : 'center',
    padding : 15,
    marginLeft : 10,
    width : 300,
    borderBottomWidth : 1,
    borderBottomColor : '#cccccc'
  },
  userInfoText : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginBottom : 5
  },
  userName : {
    fontSize : 14,
    fontWeight : 'bold',
    fontFamily : 'Lato-Regular'

  },
  postTime : {
    fontSize : 12,
     color: '#666',
      fontFamily : 'Lato-Regular'
  },
  messageText : {
    fontSize : 14,
    color: '#333333'
  },
  card : {
  width : '100%'}
});
