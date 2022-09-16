import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import {
    Image,
    TouchableOpacity, View
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';
import { COLORS, icons } from "../constants";
import { GlobalContext } from '../context/GlobalState';
import { SignInScreen } from "../screens";
import EditProfileScreen from "../screens/account/EditProfileScreen";
import ProfileScreen from '../screens/account/ProfileScreen';
import SignUpScreen from '../screens/account/SignUpScreen';
import UserLoginActivity from '../screens/account/UserLoginActivity';
import ChatScreen from '../screens/chat/ChatScreen';
import Contacts from "../screens/chat/Contacts";
import Messages from "../screens/chat/Messages";
import AddNotes from "../screens/notes/AddNotes";
import EditNotes from "../screens/notes/EditNotes";
import NotesHome from "../screens/notes/NotesHome";
import AdminDashboard from '../screens/tenant/AdminDashboard';
import BuildingDetails from '../screens/tenant/BuildingDetails';
import Dashboard from '../screens/tenant/Dashboard';
import EditOrderDetails from "../screens/tenant/order/EditOrderDetails";
import PaymentDetails from '../screens/tenant/order/PaymentDetails';
import TenantRoomDetails from '../screens/tenant/TenantRoomDetails';
import TenantRoomTransactionList from "../screens/tenant/TenantRoomTransactionList";
import TenantSignUp from "../screens/tenant/TenantSignUp";
import TenantsList from '../screens/tenant/TenantsList';
import TransactionsList from '../screens/tenant/TransactionsList';
import UserDashboard from '../screens/tenant/user/UserDashboard';

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();
const TransactionsStack = createStackNavigator();
const NotesStack = createStackNavigator();
const MessageStack = createStackNavigator();



const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
    const isIphoneX = false;
    if (isIphoneX) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        )
    } else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }

}

const Tabs = () => {
    return (
        <Tab.Navigator

            screenOptions={{
                headerShown: false,
                style: {
                    backgroundColor: colors.white,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20, position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    backgroundColor: "transparent",
                    elevation: 0
                },
                activeTintColor: colors.orange,
                inactiveTintColor: colors.gray,
                showLabel: false,
                tabBarShowLabel: false,
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen
                name="DashboardScreen"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),
                    headerShown: false
                }}
            />


            {/*
            <Tab.Screen
                name="BuildingDetails"
                component={BuildingDetails}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="TenantRoomDetails"
                component={TenantRoomDetails}
                options={{
                    headerShown: false,
                }}
            />
		
            <Tab.Screen
                name="Search"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Like"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.like}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="User"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            /> */}

            <Tab.Screen
                name="Transactions"
                component={TransactionsStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.transactions}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Notes"
                component={NotesStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.notes}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Message"
                component={MessageStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.chat}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

        </Tab.Navigator>
    )
}

const MessageStackScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <MessageStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>

            <MessageStack.Screen
                        name="Message screen"
                        component={Messages}
                        options={({ route }) => ({
                            //title: route.params.title,
                            title: "Messages",
                            headerBackTitleVisible: false,
                            headerShown: false,
                        })}
            />
            <MessageStack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "ChatScreen",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <MessageStack.Screen
                name="contacts"
                component={Contacts}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "Contacts",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
        </MessageStack.Navigator>
    );
};

const NotesStackScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <NotesStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <NotesStack.Screen
                name="Home Note"
                component={NotesHome}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "NotesHome",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <NotesStack.Screen
                name="AddNotes"
                component={AddNotes}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "AddNotes",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <NotesStack.Screen
                name="EditNotes"
                component={EditNotes}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "EditNotes",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
        </NotesStack.Navigator>
    );
};


const TransactionsStackScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <TransactionsStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <TransactionsStack.Screen
                name="TransactionsList"
                component={TransactionsList}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "TransactionsList",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
        </TransactionsStack.Navigator>
    );
};



const HomeStackScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { userDetails, isAdmin } = useContext(GlobalContext);

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            {isAdmin ? (
                <HomeStack.Screen
                    name="AdminDashboard"
                    component={AdminDashboard}
                    options={{
                        headerShown: false,
                    }}
                />) : (
                <HomeStack.Screen
                    name="UserDashboard"
                    component={UserDashboard}
                    options={{
                        headerShown: false,
                    }}
                />
            )}


            <HomeStack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="BuildingDetails"
                component={BuildingDetails}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="PaymentDetails"
                component={PaymentDetails}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="EditOrderDetails"
                component={EditOrderDetails}
                options={{
                    headerShown: false,
                }}
            />

            <HomeStack.Screen
                name="TenantRoomDetails"
                component={TenantRoomDetails}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "TenantRoomDetails",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <HomeStack.Screen
                name="TenantsList"
                component={TenantsList}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "TenantsList",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <HomeStack.Screen
                name="TransactionsList"
                component={TransactionsList}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "TransactionsList",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <HomeStack.Screen
                name="TenantRoomTransactionList"
                component={TenantRoomTransactionList}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "TenantRoomTransactionList",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <HomeStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "SignUpScreen",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <HomeStack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "SignInScreen",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
            <HomeStack.Screen
                name="TenantSignUp"
                component={TenantSignUp}
                options={({ route }) => ({
                    //title: route.params.title,
                    title: "TenantSignUp",
                    headerBackTitleVisible: false,
                    headerShown: false,
                })}
            />
        </HomeStack.Navigator>
    );
};


const ProfileStackScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: colors.text,
            }}>
            <ProfileStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: '',
                    headerShown: false,
                    headerBackTitleVisible: true,
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            {/* <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              /> */}
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ marginRight: 10 }}>
                            <MaterialCommunityIcons.Button
                                name="account-edit"
                                size={25}
                                backgroundColor={colors.background}
                                color={colors.text}
                                onPress={() => navigation.navigate('EditProfile')}
                            />
                        </View>
                    ),
                }}
            />
            <ProfileStack.Screen
                name="EditProfile"
                options={{
                    title: 'Edit Profile',
                    headerShown: false,
                    headerBackTitleVisible: true,
                }}
                component={EditProfileScreen}
            />
            <ProfileStack.Screen
                name="UserLoginActivity"
                options={({ route }) => ({
                    title: 'User Login Activity',
                    headerShown: false,
                    headerBackTitleVisible: false,
                })}
                component={UserLoginActivity}
            />
        </ProfileStack.Navigator>
    );


};

export default Tabs
