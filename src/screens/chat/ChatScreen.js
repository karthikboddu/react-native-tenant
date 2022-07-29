import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../context/GlobalState';
import { disconnectSocket, initiateSocketConnection, sendMessage, subscribeToMessages } from '../../services/socketService';

const ChatScreen = ({route,navigation}) => {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState('');
  const {fetchTenantConversations, tenantConversations, 
    createTenantConversations,userToken, getUserToken, screenLoading } = useContext(GlobalContext);
  const CHAT_ROOM = "myRandomChatRoomId";
  console.log(route?.params?.id,"route",{ roomName: CHAT_ROOM, stoken : route?.params?.fromUserId, to : route?.params?.id, parentId : route?.params?.parentId})

  useEffect(() => {
    setToken(route?.params?.fromUserId)
    if (token) {
      console.log(token, "usertoken");
      fetchTenantConversations(route?.params?.id);
      initiateSocketConnection(token);
      setMessages(tenantConversations.conversation)
      subscribeToMessages({token}, (err,data) => {
        console.log(data);
        setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, data),
      );
      });
      return () => {
        disconnectSocket();
        setMessages([])
      }
    }

    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchTenantConversations(route?.params?.id);
    }); return willFocusSubscription;


    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //     image: 'https://placeimg.com/140/140/any',
    //   },
    //   {
    //     _id: 2,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 3,
    //     text: 'Hello world',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //     sent: true,
    //     received: true,
    //     pending: true,
    //     quickReplies: {
    //       type: 'radio', // or 'checkbox',
    //       keepIt: true,
    //       values: [
    //         {
    //           title: '😋 Yes',
    //           value: 'yes',
    //         },
    //         {
    //           title: '📷 Yes, let me show you with a picture!',
    //           value: 'yes_picture',
    //         },
    //         {
    //           title: '😞 Nope. What?',
    //           value: 'no',
    //         },
    //       ],
    //     },
    //   },
    // ]);
    console.log(messages, "usertoken");
  }, [token]);

  const onSend = useCallback((messages = [], text) => {
    const payload = {
      text : messages[0].text,
      toTenantId  : route?.params?.id,
      assetType : 'TEXT'
    }
    console.log(token,"payload")

    //createTenantConversations(JSON.stringify(payload));

    
    sendMessage({message: text[0].text, roomName: CHAT_ROOM, stoken : route?.params?.fromUserId, to : route?.params?.id, parentId : route?.params?.parentId}, cb => {
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

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages, messages)}
      user={{
        _id: route?.params?.id,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      isTyping={true}
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
