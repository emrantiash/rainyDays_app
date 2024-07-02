import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails } from '../../redux/slices/orderSlice';
import { Button, ListItem, Avatar, Badge } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';

const _size = Dimensions.get('window').width * 15 / 100;

export default function CollectionScreen() {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const dataset = useSelector((state) => state.orderReducer.orderDetails)
  const login = useSelector((state) => state.loginReducer)
  const token = useSelector((state) => state.loginReducer.data.token)
  const pickup_officer_id = login.data.data.id

  //  console.log("===login===",login)

  const option = "pickup_officer_id=" + pickup_officer_id + "&status=1"
  let combinedData = [option, token]


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getOrderDetails(combinedData))
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(getOrderDetails(combinedData))
  }, [])

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem.Swipeable


    >

      <WDIcon name="folder" size={_size} color="orange" />

      <ListItem.Content >
        <ListItem.Title >
          {/* <Badge value={item.count} status="success" /> */}
        </ListItem.Title>
        <View style={styles.box}>
          <ListItem.Subtitle>{item.reference_id}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.blue}>{item.barcode}</ListItem.Subtitle>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />


    </ListItem.Swipeable>
  )

  return (
    <View style={styles.container}
    >
      <View style={styles.number}>
        <Text style={styles.numberText}>{Array.isArray(dataset) ? dataset.length : 0}</Text>
      </View>

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
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    // alignItems : 'flex-start'

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
    color: '#0089E3'
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


