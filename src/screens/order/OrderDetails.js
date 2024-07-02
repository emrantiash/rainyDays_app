import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, storeOrderInside } from '../../redux/slices/orderSlice'
import { Button, ListItem } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';

const _size = Dimensions.get('window').width * 10 / 100;

export default function OrderDetailsScreen({ navigation }) {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const login = useSelector((state) => state.loginReducer)
  const token = useSelector((state) => state.loginReducer.data.token)
  const pickup_officer_id = login.data.data.id
  const data = useSelector((state) => state.orderReducer)
  const order = data.orderData
  const dataset = data.orderDetails
  const area_id = order.pickup_area_id
  const merchant = data.thisMerchant

  // console.log("==login  ===",login)

  let option = "status=0" + "&merchant_id=" + merchant.merchant_id + "&pickup_officer_id=" + pickup_officer_id + "&pickup_area_id=" + area_id



  let combinedData = [option, token]


  useEffect(() => {
    dispatch(getOrderDetails(combinedData))
  }, [])

  const onRefresh = React.useCallback(() => {

    setRefreshing(true);
    setTimeout(() => {
      dispatch(getOrderDetails(combinedData))
      setRefreshing(false);
    }, 2000);
  }, []);

  const _callMarchant = (mobile) => {
    console.log("good")
    const phoneNumber = mobile

    Linking.openURL(`tel:${phoneNumber}`)
  }

  const _storeThisDetails = (item) => {
    dispatch(storeOrderInside(item))
    navigation.navigate('Order-Inside')
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="call"
          onPress={() => _callMarchant(item.merchant_mobile)}
          icon={<WDIcon name="mobile" size={_size} color="#fff" />}
          buttonStyle={{ minHeight: '100%' }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Details"
          onPress={() => _storeThisDetails(item)}
          icon={{ name: 'description', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: '#00CC83' }}
        />
      )}
    >

      <WDIcon name="notification" size={_size} color="orange" />

      <ListItem.Content >
        <ListItem.Title >
          {/* <Badge value={item.count} status="success" /> */}
        </ListItem.Title>
        <View style={styles.box}>
          <ListItem.Subtitle>{item.reference_id}</ListItem.Subtitle>
          {/* <ListItem.Subtitle style={styles.blue}>{item.merchant_shop_address}</ListItem.Subtitle> */}
        </View>
      </ListItem.Content>
      <ListItem.Chevron />

    </ListItem.Swipeable>
  )
  return (
    <View>
      <Text style={styles.subHeader}>{merchant.merchant_name} {'   ' + merchant.count}</Text>


      <FlatList
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={keyExtractor}
        data={dataset}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    // alignItems : 'flex-start'

  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    padding: 8,
    marginBottom: 5,
    letterSpacing: 0.5,
    fontSize: (_size * 40) / 100
  },
  mobile: {
    width: '100%',
    marginLeft: (_size * 50) / 100,
    padding: 0
  },

  address: {
    width: '100%',
    margin: 10,
    padding: 10
  },

  box: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  pullBox: {
    //  height: 20,

  },
  blue: {
    color: '#0089E3'
  },
  scrollView: {
    // flex: 1
    backgroundColor: 'green'
  }
})