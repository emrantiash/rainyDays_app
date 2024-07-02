import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStoreCheckOrderDetails,storeBarcode,StoreChangeOrderStatus } from '../../redux/slices/storeSlice'
import { Button, ListItem, } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import WDInput from '../../component/input/Input';
const _size = Dimensions.get('window').width * 15 / 100;

export default function StoreOrderDetailsScreen() {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const [value,setValue] = useState("")
  // const login = useSelector((state) => state.loginReducer)
  const token = useSelector((state) => state.loginReducer.data.token)
  const dataset = useSelector((state) => state.storeReducer.order)
  const thisman = useSelector((state) => state.storeReducer.thisman)
  const pickup_officer_id = thisman.pickup_officer_id
  const [selection,setSelection] = useState({
    start: 0,
            end: 0

  })

  const option = "status=1&pickup_officer_id=" + pickup_officer_id
  // console.log(dataset)
  let combinedData = [option, token]

  useEffect(() => {
    dispatch(getStoreCheckOrderDetails(combinedData))
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getStoreCheckOrderDetails(combinedData))
      setRefreshing(false);
    }, 2000);
  }, []);

  const changeText = (e) =>{
    dispatch(storeBarcode(e))
    setValue(e)
    const option = "barcode="+e+"&status=2"
    let combinedData = [option, token]
    dispatch(StoreChangeOrderStatus(combinedData)).then(function(e){
        if(e.payload.success){
          // console.log(item.barcode , e)
          // dataset.filter((item) => item.barcode !== e)
          console.log(dataset.length)
          
        }
        setValue("")
    })
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem.Swipeable


    >

      <WDIcon name="folder" size={_size} color="red" />

      <ListItem.Content >
        <ListItem.Title >
          {/* <Badge value={item.count} status="success" /> */}
        </ListItem.Title>
        <View style={styles.box}>
          <ListItem.Subtitle>{item.reference_id}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.barcode}</ListItem.Subtitle>
          {/* <ListItem.Subtitle style={styles.blue}>
            <WDBadge value={item.count} status="warning" />
          </ListItem.Subtitle> */}
        </View>
      </ListItem.Content>
      <ListItem.Chevron />


    </ListItem.Swipeable>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>{thisman.pickup_officer_name}</Text>
      <WDInput 
      // selection = {selection}
      value={value}
      onChangeText={(e)=>changeText(e)}
      />


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
    fontSize: (_size * 30) / 100
  },

  box: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pullBox: {
    //  height: 20,

  },
  blue: {
    color: '#0089E3',
  },
  scrollView: {
    // flex: 1
    backgroundColor: 'green'
  },
  number: {
    backgroundColor: '#00CC83',
    margin: _size * 20 / 100,
    heigth: _size * 50 / 100,
    width: _size * 50 / 100,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
    alignContent: 'flex-end'

  },
  numberText: {
    color: '#fff'
  }
})