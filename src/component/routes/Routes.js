import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../../screens/home/Home';
import LoginScreen from '../../screens/login/Login';
import DetailsScreen from '../../screens/details/Details';
import CollectionScreen from '../../screens/collection/Collection';
import OrderScreen from '../../screens/order/Order';
import OrderDetailsScreen from '../../screens/order/OrderDetails';
import OrderInsideScreen from '../../screens/order/OrderInside';
import OrderMerchant from '../../screens/order/OrderMerchant';
import StoreHome from '../../screens/home/StoreHome';
import DashStoreScreen from '../../screens/collection/DashStore';
import DashStoreAreaScreen from '../../screens/collection/DashStoreArea';
import StoreOrderDetailsScreen from '../../screens/store/StoreOrderDetails';
import StoreScreen from '../../screens/collection/Store';
import DashStoreAreaOrderDetailsScreen from '../../screens/collection/DashStoreAreaOrderDetails';
import OrderPickToVanScreen from '../../screens/order/OrderPickToVan';
import OrderScanToVanScreen from '../../screens/order/OrderScanToVan';
import OrderVanScreen from '../../screens/order/OrderVan';

import DeliveryHomeScreen from '../../screens/home/DeliveryHome';
import DeliveryCollectionScreen from '../../screens/collection/DeliveryCollection';
import DeliveryAssignedOrderScreen from '../../screens/delivery/AssignedOrder';
import DeliveryAssignedOrderDetails from '../../screens/delivery/AssignedOrderDetails';
import NewOrderScreen from '../../screens/delivery/NewOrder';
import NewOrderMerchantCountScreen from '../../screens/delivery/NewOrderMerchantCount';
import NewOrderDetails from '../../screens/delivery/NewOrderDetails';
import MultipleOrderShow from '../../screens/delivery/MultipleOrderShow';
import DeliveryOrderDestination from '../../screens/delivery/OrderDestination';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {

  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: 'gray',
      tabBarActiveBackgroundColor: '#FF6666',
      tabBarIcon: ({ focused, color, size }) => 
        // <Ionicons name="home" size={30} color="#900" />
        {
          let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'alert-circle-outline';
            } else if (route.name === 'Collection') {
              iconName = focused ? 'list' : 'alert-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        }
      


    })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Collection" component={CollectionScreen} />
    </Tab.Navigator>
  );
}

function Store() {

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarActiveBackgroundColor: '#00CC83',
      lazy: 'true'


    })}

    >
      <Tab.Screen name="Receive" component={StoreHome} />
      <Tab.Screen name="Store" component={DashStoreScreen} />
    </Tab.Navigator>
  );
}

function Delivery(){
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: 'gray',
      tabBarActiveBackgroundColor: '#FF6666',
      tabBarIcon: ({ focused, color, size }) => 
        // <Ionicons name="home" size={30} color="#900" />
        {
          let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'alert-circle-outline';
            } else if (route.name === 'Collection') {
              iconName = focused ? 'list' : 'alert-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        }
      


    })}
    >
      <Tab.Screen name="Home" component={DeliveryHomeScreen} />
      <Tab.Screen name="Collection" component={DeliveryCollectionScreen} />
    </Tab.Navigator>
  )
}


export default function Routes() {
  const isLogin = useSelector((state) => state.loginReducer.login)
  const user = useSelector((state) => state.loginReducer)

  const role = user.data.data && user.data.data.role
  const name =  user.data.data && user.data.data.name
  console.log("the role is ===",user)

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={isLogin ? role == 1 ? Home : role == 2 ? Delivery: Store : LoginScreen}
        options={{
          title: isLogin ? role == 1 ?  name : 'Home' : 'Login',
          headerStyle: {
            backgroundColor: '#1D9BF0',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Order-Details" component={OrderDetailsScreen} />
      <Stack.Screen name="Order-Inside" component={OrderInsideScreen} />
      <Stack.Screen name="Order-Merchant" component={OrderMerchant} />
      <Stack.Screen name="Store-Home" component={StoreHome} />
      <Stack.Screen name="Store-Details" component={StoreOrderDetailsScreen} />
      <Stack.Screen name="Store-Report" component={StoreScreen} />
      <Stack.Screen name="Store-Area" component={DashStoreAreaScreen} />
      <Stack.Screen name="Store-Area-Details" component={DashStoreAreaOrderDetailsScreen} />
      <Stack.Screen name="Pick-Van" component={OrderPickToVanScreen} />
      <Stack.Screen name="Scan-Van" component={OrderScanToVanScreen} />
      <Stack.Screen name="Van" component={OrderVanScreen} />

      <Stack.Screen name="DHome" component={DeliveryHomeScreen} />
      <Stack.Screen name="DCollection" component={DeliveryCollectionScreen} />
      <Stack.Screen name="Show-Order" component={DeliveryAssignedOrderScreen} />
      <Stack.Screen name="Approave-Order" component={DeliveryAssignedOrderDetails} />
      <Stack.Screen name="New-Order" component={NewOrderScreen} />
      <Stack.Screen name="My-Customer" component={NewOrderMerchantCountScreen} />
      <Stack.Screen name="Merchant-Order" component={NewOrderDetails} />
      <Stack.Screen name="Go-Order" component={DeliveryOrderDestination} />
      <Stack.Screen name="Multiple-Order" component={MultipleOrderShow} />
      


    </Stack.Navigator>
  )
}
