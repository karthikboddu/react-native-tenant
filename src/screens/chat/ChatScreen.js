import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CryptoJS from "react-native-crypto-js";
import { Actions, Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import ChatHeader from '../../components/Chat/ChatHeader';
import { GlobalContext } from '../../context/GlobalState';
import endpoints from '../../endpoints';
import { pickImage, uploadImage } from '../../helpers/firebase';
import deviceStorage from '../../services/deviceStorage';
import { disconnectSocket, initiateSocketConnection, onTypingMessage, sendMessage, subscribeToMessages } from '../../services/socketService';

const ChatScreen = ({route,navigation}) => {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState('');
  const [typing, setTyping] = useState(false);
  
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const { fetchAllTenantLastConversations } = useContext(GlobalContext);

  const CHAT_ROOM = "myRandomChatRoomId";

  console.log(route?.params?.id,"route",{ roomName: CHAT_ROOM, stoken : route?.params?.fromUserId, to : route?.params?.id, parentId : route?.params?.parentId})

  let query = '?page=' + 1 + '&size=' + 20;
  useEffect(() => {

    setToken(route?.params?.fromUserId)
    if (token) {

      listTenantConversations(route?.params?.id, query);
      initiateSocketConnection(token);
      subscribeToMessages({token}, (err,data) => {
        console.log(data);
        console.log(data.isTyping, data.receiverToken,route?.params?.id, data.senderToken, route?.params?.fromUserId);
        if (data.isTyping == null) {
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, data),
            );
          //listTenantConversations(route?.params?.id, query),
          fetchAllTenantLastConversations()
        } else if (data.receiverToken == route?.params?.fromUserId && data.senderToken == route?.params?.id){
          console.log(typing,"istyping")
          setTyping(true)
        }
      });
      return () => {
        disconnectSocket();
        setMessages([])
      }
    }

    const willFocusSubscription = navigation.addListener('focus', () => {
      // listTenantConversations(route?.params?.id, query);
    }); return willFocusSubscription;


   
  }, [token,typing]);

  const onSend = useCallback((messages = [], text) => {
    const payload = {
      text : messages[0].text,
      toTenantId  : route?.params?.id,
      assetType : 'TEXT'
    }
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text[0].text), '0123456789123456').toString();

    //createTenantConversations(JSON.stringify(payload));
    console.log({message: ciphertext, roomName: CHAT_ROOM, stoken : route?.params?.fromUserId, to : route?.params?.id, parentId : route?.params?.parentId},"message")
    
    sendMessage({message: ciphertext, roomName: CHAT_ROOM, stoken : route?.params?.fromUserId, to : route?.params?.id, parentId : route?.params?.parentId}, cb => {
    	console.log(cb);
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }
  const onTyping = (val) => {
    onTypingMessage({message: val, stoken : route?.params?.fromUserId, to : route?.params?.id, isTyping : true}, cb => {
    	console.log(cb);
    });
  }
  const renderFooter = () =>{
    if (typing){
      return (<Text>User is typing</Text>)
    }
    return null;
  }


  const listTenantConversations = async (toTenantId, query) => {
  try {
      const accessToken = await deviceStorage.loadJWT();
      let url = `${endpoints.apiUrl}` + `${endpoints.listConversationsByTenantId}` + query;
      console.log(url,"url",toTenantId)
      await fetch(url.replace('#',toTenantId), {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': accessToken
          }
      }).
      then((response) => response.json())
      .then((json) => {
        console.log(json?.data.conversation.length,"json?.data.conversation.length")
        if (json?.data.conversation.length > 0) {
          decryptJsonData(json?.data.conversation);
          setMessages((previousMessages) =>
            GiftedChat.prepend(previousMessages, json?.data.conversation),
          );
        }
        setPage(json?.data._pagination.pageNumber)
        setRefreshing(false);
      }).catch((error) => {
        console.log(error)
      })

  } catch (e) {
      Alert.alert('Sorry, something went wrong.', e.message);
      throw handler(e);
  }
}

const decryptJsonData = (data) => {
  let resultData = [];
  
  data.forEach(element => {
    var list = {};
    list = element;
    console.log(list,"Data**************")
    if (!(typeof element.text === 'string' && element.text.trim().length === 0)) {
    
      list.text = decryptText(element.text);
    }
    resultData.push(list);
  });

  return resultData;

}

const decryptText = (text) => {
  console.log(text,"cipter")
  let bytes  = CryptoJS.AES.decrypt(text, '0123456789123456');
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log(decryptedData,"decipter")
  return decryptedData;
}

  const loadMoreMessage = () => {
    const nextPage = page + 1;
    setPage(page + 1)
    let nextQuery = '?page=' + nextPage + '&size=' + 20;
    console.log(nextQuery);
     listTenantConversations(route?.params?.id, nextQuery);
  }

  const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToTop = 80;
    return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
  }

  const handlePhotoPicker = async() => {
    const result = await pickImage();
    if (!result.cancelled) {
      await sendImage(result.uri, route?.params?.fromUserId);
    }
  }

  async function sendImage(uri, path) {
    const { url, fileName } = await uploadImage(
      uri,
      `images/${path}`
    );
    console.log(url,"download url")

    const messages = {
      _id : fileName,
      text : "",
      user : {
        "_id": route?.params?.fromUserId,
      },
      toTenantId  : route?.params?.id,
      image : url,
      assetType : 'IMAGE'
    }

   
    
    sendMessage({message: "", roomName: CHAT_ROOM, stoken : route?.params?.fromUserId, to : route?.params?.id, parentId : route?.params?.parentId, image : url}, cb => {
    	console.log(cb);
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

  }

  return (
    <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather name="chevron-left" size={12} color={colors.textDark} />
              </View>

            </TouchableOpacity>
            <View style={styles.headerRight}>
              <ChatHeader/>
            </View>
          </View>

        </SafeAreaView>


    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages, messages)}
      user={{
        _id: route?.params?.fromUserId,
      }}
      renderBubble={renderBubble}
      onInputTextChanged={(val) => onTyping(val)}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      isTyping={true}
      renderFooter={renderFooter}
      loadEarlier={refreshing}
      listViewProps={{
          scrollEventThrottle: 400,
          onScroll: ({ nativeEvent }) => {
            if (isCloseToTop(nativeEvent)) {
              setRefreshing(true);
              loadMoreMessage();
            }
          }
        }}
      scrollToBottomComponent={scrollToBottomComponent}
      renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={{
              position: "absolute",
              right: 50,
              bottom: 5,
              zIndex: 9999,
            }}
            onPressActionButton={handlePhotoPicker}
            icon={() => (
              <Ionicons name="camera" size={30} color={colors.primary} />
            )}
          />
        )}
        timeTextStyle={{ right: { color: colors.primary } }}
    />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerLeft: {
    borderColor: colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    padding: 12,
    borderRadius: 10,
    borderColor: colors.white,
    borderWidth: 2,
  
  },
});
