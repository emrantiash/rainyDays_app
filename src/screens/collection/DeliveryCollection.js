import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getDeliveryCOllection } from '../../redux/slices/deliverySlice';
import { Button, ListItem, Avatar, Badge } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import commonStyle from '../../component/style/Style';
import WDSkeleton from '../../component/skeleton/Skeleton';

const _size = Dimensions.get('window').width * 10 / 100;

export default function DeliveryCollectionScreen({ navigation }) {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [dataset, setDataset] = useState([])
  const [data, setData] = useState({})
  const token = useSelector((state) => state.loginReducer.data.token)


  const getApiData = () => {
    dispatch(getDeliveryCOllection(token)).then(function (e) {
      if (e.payload.success) {
        setIsLoading(false)
        setDataset(e.payload.data)
        setData(e.payload)
      }
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiData()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getApiData()
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getApiData()
  }, [])

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem.Swipeable


    >

      <WDIcon name="hand" size={_size} color={commonStyle.color.red} />

      <ListItem.Content >
        <ListItem.Title >
          {/* <Badge value={item.count} status="success" /> */}
        </ListItem.Title>
        <View style={styles.box}>
          <View style={styles.insideBox}>
            <ListItem.Subtitle>Order # {item.reference_id}</ListItem.Subtitle>
            <ListItem.Subtitle >{item.customer_name}</ListItem.Subtitle>
            <ListItem.Subtitle >{item.customer_mobile}</ListItem.Subtitle>
          </View>

          <ListItem.Subtitle style={styles.blue}>{item.amount_collected}</ListItem.Subtitle>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />


    </ListItem.Swipeable>
  )

  return (
    <View style={styles.container}
    >
      <View style={styles.numberParent}>
        <View style={styles.number}>
          <Text style={styles.numberText}>Order # {Array.isArray(dataset) ? data.totalOrder : 0}</Text>
        </View>
        <View style={styles.number}>

          <Text style={styles.numberText}>Tk:{Array.isArray(dataset) ? data.totalAmount : 0}</Text>
        </View>

      </View>

      {
        isLoading &&
        <WDSkeleton />
      }

      {
        Array.isArray(dataset) && !isLoading && dataset.length == 0 &&
        <View style={styles.msg}>
          <Text>No Data Found</Text>
        </View>
      }


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
  insideBox: {
    flexDirection: 'column',

  },
  blue: {
    color: '#0089E3'
  },
  scrollView: {
    // flex: 1
    backgroundColor: 'green'
  },
  numberParent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  number: {
    // backgroundColor: '#00CC83',
    // margin: _size * 20 / 100,
    // heigth: _size * 50 / 100,
    // width: _size * 50 / 100,
    // //  justifyContent: 'flex-end',
    // alignItems: 'center',
    // borderRadius: 50,
    // alignContent: 'flex-end',
    // flexDirection : 'row',
    // justifyContent : 'center'

  },
  numberText: {
    // color: '#fff'
  },
  msg : {
    flex:1,
    justifyContent : 'center',
    alignItems : 'center'
}
})


