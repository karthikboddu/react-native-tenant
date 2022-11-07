import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

export default function useContacts() {

  const [tenants, setTenants] = useState([]);

  const users = [
    {
        "_id": "61f64f7af320710016814605",
        "parent_id": "61f64f9af320710016814606",
        "full_name": "karthikboddu",
        "password": "$2b$08$C9fRHUUk4J8rLw5lfk6ym.UHv2yIQzBlL/j5vHMunjkRtbNzVVbLm",
        "user_role": {
            "$oid": "61c35c8f14263e7f4d7e6d6d"
        },
        "username": "karthikboddu",
        "email": "karthik@gmail.com",
        "mobile_no": 9030493600
    },
    {
        "_id": "621b5866038d7f00166823d6",
        "parent_id": "61f64f9af320710016814606",
        "full_name": "srikanthboddu",
        "password": "$2b$08$OFhN0AXjjgkfPSJkpJmZUeuA1qqywGBI7lm61JnjCv8LJeeEld/ye",
        "user_role": {
            "$oid": "61c35c8f14263e7f4d7e6d6d"
        },
        "username": "srikanthboddu",
        "email": "srikanthboddu@gmail.com",
        "mobile_no": 9030493600
    },
    {
        "_id": "62d04323048802003e92ce92",
        "userType": "INTERNAL",
        "parent_id": "61f64f9af320710016814606",
        "full_name": "narasaiah",
    
        "username": "narasaiah",
        "email": "narasaiah@gmail.com",
        "mobile_no": 77777
        
    },
    {
        "_id":"62c6f395055f090016603713",
        "userType": "INTERNAL",
        "parent_id": "61f64f9af320710016814606",
        "full_name": "sridhar",
        "username": "sridhar",
        "email": "sridhar@gmail.com",
        "mobile_no": 9999999999
       
    },
    {
        "_id":"62c6eb02055f0900166035c3",
        "userType": "INTERNAL",
        "parent_id": "61f64f9af320710016814606",
        "full_name": "marty byrde",
        "username": "marty",
        "email": "marty@gmail.com",
        "mobile_no": 9999999999
     
    }
  ]

  const [contacts, setContacts] = useState([]);
  const [numbers, setNumbers] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails,Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(
            data
              .filter(
                (c) =>
                 c.firstName && c.emails && c.emails[0] && c.emails[0].email 
                 && c.phoneNumbers && c.phoneNumbers[0] && (c.phoneNumbers[0].number)
              )
              .map(mapContactToUser)
          );
        }
      }
    })();
  }, []);
  return contacts
}
function mapContactToUser(contact) {
  return {
    contactName:
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}`
        : contact.firstName,
    email: contact.emails[0].email,
    number : contact.phoneNumbers[0].number.replace('+',''),
  };
}