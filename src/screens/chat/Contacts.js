import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from '../../components/Chat/ListItem';
import { GlobalContext } from '../../context/GlobalState';
import useContacts from '../../helpers/useHooks';

const Contacts = ({route}) => {

    const contacts = useContacts();
    const {tenantDetailsList} = useContext(GlobalContext);

    useEffect(() => {
        // console.log("**********",contacts,"sad",route?.params?.fid)
        console.log(contacts.length,"length")

    }, [])

    const data = contacts.filter(
            (c) =>
             c.number)
          .map(mapContactNumberList)

    function mapContactNumberList(contact) {
        return parseInt(contact.number)
    }
    
    let arr = [];
    tenantDetailsList.tenants.forEach(element => {
        if (data.includes(element.mobileNumber)) {
            arr.push(element);
        }
    });
    // console.log(arr,"Data")
    return (
        <FlatList
            style={{ flex: 1, padding: 10 }}
            data={arr}
            keyExtractor={(_, i) => i}
            renderItem={({ item }) => <ContactPreview contact={item} all={contacts} fromUserId={route?.params?.fid} />}
        />
    )
}


const ContactPreview = ({contact, fromUserId}) => {
    console.log(contact, "all");
    
    const { userDetails} = useContext(GlobalContext);
    const [user, setUser] = useState(contact);
    return (
        <ListItem
        style={{ marginTop: 7 }}
        type="contacts"
        user={user}
        fId = {userDetails._id}
      />
    )
}

export default Contacts

const styles = StyleSheet.create({})