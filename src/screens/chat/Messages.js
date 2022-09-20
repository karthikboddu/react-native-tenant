import React, { useContext, useEffect } from 'react';
import Moment from 'react-moment';
import { FlatList, StyleSheet, Text } from 'react-native';
import ContactsFloatingIcon from '../../components/Chat/ContactsFloatingIcon';
import DecryptText from '../../components/Chat/DecryptText';
import { GlobalContext } from '../../context/GlobalState';
import {
  Card, Container, PostTime, TextSection, UserImg, UserImgWrapper, UserInfo, UserInfoText,
  UserName
} from '../../styles/MessageStyles';

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


const Messages = ({navigation}) => {

  const {fetchAllTenantLastConversations, tenantLastConversations, fetchAllTenantList} = useContext(GlobalContext);

  useEffect(() => {
    fetchAllTenantLastConversations()
    fetchAllTenantList()
    console.log(tenantLastConversations,"tenantLastConversations   ");
    
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchAllTenantLastConversations()
    }); return willFocusSubscription;

  },[])
 
    return (
      <Container>
        <FlatList 
          data={tenantLastConversations.conversations}
          keyExtractor={item=>item._id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('ChatScreen', {id: item.user._id, fromUserId : item.from_tenant_id, parentId : item.parentId, user : item.user})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg 
                  source={
                    item.user.avatar
                    ? { uri: item.user.avatar }
                    : require("../../assets/icon-square.png")
                    }
                  />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.user.name}</UserName>
                    <PostTime>
                      <Moment fromNow element={Text}>{item.updatedAt}</Moment>
                    </PostTime>
                  </UserInfoText>
                  <DecryptText text={item.lastMessage}/>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
        <ContactsFloatingIcon fromUserId = { tenantLastConversations.conversations &&  tenantLastConversations.conversations[0] ?  tenantLastConversations.conversations[0].from_tenant_id: null}/>
      </Container>
    );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
