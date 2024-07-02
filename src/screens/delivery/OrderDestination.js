import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions, Linking } from 'react-native'
import { assignedDetailsMore, deliveryTheOrder } from '../../redux/slices/deliverySlice';
import { Button, ListItem, FAB, Chip } from '@rneui/themed';

import WDSkeleton from '../../component/skeleton/Skeleton';
import WDIcon from '../../component/icon/Icon';
import WDSpeedDial from '../../component/speedDial/SpeedDial';

const _size = Dimensions.get('window').width * 10 / 100;
const _width = Dimensions.get('window').width * 100 / 100
const _height = Dimensions.get('window').height

// reference_id=1EYZ987E57&barcode=600150000014375&status=1

export default function DeliveryOrderDestination({ navigation }) {
  const dispatch = useDispatch()
  const customer = useSelector((state) => state.deliveryReducer.thisCustomer)
  const area = useSelector((state) => state.deliveryReducer.item)
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const token = useSelector((state) => state.loginReducer.data.token)
  const user = useSelector((state) => state.loginReducer.data.data.id)
  const checkStatus = useSelector((state) => state.deliveryReducer.status)
  const [dataset, setDataset] = useState([])
  const [total, setTotal] = useState(0)
  const [deliveryCharge, setDeliveryCharge] = useState(0)
  
  const [msg, setMsg] = useState("")


  // console.log(customer)

  const option = "status="+checkStatus+"&delivery_officer_id=" + user + "&customer_mobile=" + customer.customer_mobile + "&area_id=" + area.area_id
  let combinedData = [option, token]

  const makeTheApiCall = () => {
    dispatch(assignedDetailsMore(combinedData)).then(function (e) {
      setIsLoading(false)
      setDataset(e.payload.data)
    })
  }

  useEffect(() => {
    var total = 0
    var delivery = 0
    if (dataset.length > 0) {
      dataset.map((data, index) => {
        const _price = parseInt(data.product_price)
        const _delivery = parseInt(data.delivery_charge)
        total = _price + total
        delivery = _delivery + delivery


      })
    }
    setTotal(total)
    setDeliveryCharge(delivery)

  })

  //  console.log(dataset)

  useEffect(() => {
    makeTheApiCall()

  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      makeTheApiCall()
      setRefreshing(false);
    }, 2000);
  }, []);

  // console.log("the dat ais ===", dataset)

  const _takeBarCode = (val) => {
    setDisplay(val)
  }



  const _callMarchant = () => {
    const phoneNumber = customer.customer_mobile

    Linking.openURL(`tel:${phoneNumber}`)
  }

  const _deliver = (order) => {
    setMsg("")
    setIsLoading(true)
    const option = "order_id=" + order.id + "&status=7"
    let combinedData = [option, token]
    dispatch(deliveryTheOrder(combinedData)).then(function (e) {
      console.log(e.payload.success)
      if (e.payload.success) {
        setDataset(dataset.filter((item) => item.id !== order.id))
        setMsg("Order Delivered Successfully")
        setIsLoading(false)
      }
    })

  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <>
          <Button
            title=" Return"
            // onPress={() => _callMarchant(item.customer_mobile)}
            icon={{ name: 'lock', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: '#F44336' }}
          />

        </>


      )}


      rightContent={(reset) => (
        <Button
          title="Go"
          onPress={() => _deliver(item)}
          icon={{ name: 'lock-open', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: '#EF8C04' }}
        />
      )}

    >

      <WDIcon name="untag" size={_size} color="lightgreen" />

      <ListItem.Content style={styles.listItem}>
        {/* <ListItem.Title >                       
        </ListItem.Title> */}
        <View style={styles.box}>
          <View style={styles.innerBox}>
            <ListItem.Subtitle>Reference ID : <Text style={styles.reference}>  {item.reference_id} </Text></ListItem.Subtitle>
            <ListItem.Subtitle>From : {item.merchant_shop}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ fontWeight: 'bold' }}>Product Price :{item.product_price}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ fontWeight: 'bold' }}>Delivery Charge : {item.delivery_charge}</ListItem.Subtitle>
          </View>
          <ListItem.Subtitle style={styles.blue}>
          </ListItem.Subtitle>
        </View>
      </ListItem.Content>
      {/* <ListItem.Chevron /> */}

    </ListItem.Swipeable>
  )


  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>{customer.customer_name}</Text>
      <View style={styles.address}>
        {/* <Text style={styles.addressText}>{customer.customer_name}</Text> */}
        <Text style={styles.mobileText}>{customer.customer_mobile}</Text>
        <Text style={styles.addressText}>{customer.customer_address}</Text>
      </View>
      <FAB
        loading={false}
        style={{ justifyContent: 'flex-end', padding: 4, backgroundColor: 'white' }}
        visible={true}
        icon={{ name: 'phone', color: 'white' }}
        size="small"
        onLongPress={_callMarchant}
      />

      <View style={styles.errorMSg}>
        <Text style={styles.errorMSgText}>{msg}</Text>
      </View>

      {
        checkStatus==7 &&
        <View style={styles.seven}>
          <Text style={styles.sevenText}>{total + deliveryCharge}</Text>
        </View>
      }

      {
        checkStatus == 6 &&
        <FlatList
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={keyExtractor}
          data={dataset}
          renderItem={renderItem}
        />


      }

      <View>


        {
          isLoading &&
          <WDSkeleton />
        }
        {
          checkStatus == 6 &&
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'

          }}>

            <View>
              <View>
                <Text>#Price : {total}</Text>
              </View>
              <View>
                <Text>#DeliveryCharge : {deliveryCharge}</Text>
              </View>
            </View>


            <View style={{
              alignItems: 'center',
              justifyContent: 'center',

            }}>
              <Text></Text>
              <Text style={{ fontWeight: 'bold' }}>#Receivable : {total + deliveryCharge}</Text>
            </View>

          </View>
        }



      </View>

      <WDSpeedDial 
            onPress={() => navigation.navigate('Home')}
            />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },

  listItem: {
    // backgroundColor : '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    padding: 10,
    borderRadius: 8
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
  seven : {
     flex:1,
     backgroundColor : '#BC0032',
    justifyContent : 'center',
    alignItems : 'center',
     width : _width,
    height : _width,
   
  },
  sevenText : {
  color : '#fff',
  fontSize : _size
  },
  mobile: {
    width: '100%',
    marginLeft: (_size * 50) / 100,
    padding: 0
  },

  address: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'orange',
    marginVertical: 10,
    marginHorizontal: 10
  },
  addressText: {
    color: 'blue',
    fontWeight: 'bold'
  },
  shop: {
    color: 'blue'
  },
  reference: {
    color: 'green',
    letterSpacing: 0.5
  },

  box: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
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
  },
  errorMSg: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMSgText: {
    color: 'green',
    letterSpacing: 0.5
  }
})
