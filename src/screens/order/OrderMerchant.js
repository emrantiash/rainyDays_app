import { Text, View,ScrollView,FlatList,Linking ,StyleSheet,Dimensions,RefreshControl} from 'react-native'
import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getOrderByMerchant } from '../../redux/slices/orderSlice'
import { storeOrderMerchant } from '../../redux/slices/orderSlice'
import { Button, ListItem, Avatar,Badge } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';

const _size =  Dimensions.get('window').width*10/100 ;



export default function OrderMerchant ({navigation}) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const token = useSelector((state) => state.loginReducer.data.token)
    const data = useSelector((state)=>state.orderReducer)
    const dataset = data.orderMerchant
    const order = data.orderData
    const option = "pickup_area_id="+data.orderData.pickup_area_id+"&status=0"
    let combinedData = [option,token]

    console.log(dataset)

    useEffect(()=>{
         dispatch(getOrderByMerchant(combinedData))
    },[])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            dispatch(getOrderByMerchant(combinedData))
            setRefreshing(false);
        }, 2000);
    }, []);

    const _callMarchant = (mobile) =>{
        const phoneNumber = data.merchant_mobile
       
        Linking.openURL(`tel:${phoneNumber}`)
      }

      const _storeThisMerchant = (data) =>{
        dispatch(storeOrderMerchant(data))
        navigation.navigate('Order-Details')
      }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable
            leftContent={(reset) => (
                <Button
                    title="call"
                    onPress={() => _callMarchant(item.merchant_mobile)}
                    icon={ <WDIcon name="mobile" size={_size} color="#fff" />}
                    buttonStyle={{ minHeight: '100%' }}
                />
            )}
            rightContent={(reset) => (
                <Button
                    title="Details"
                    onPress={() => _storeThisMerchant(item)}
                    icon={{ name: 'description', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#00CC83' }}
                />
            )}
        >
  
            {/* <WDIcon name="creative-commons-attribution" size={_size} color="orange" /> */}
            <View style={styles.number}><Text style={styles.numberText}>{item.count}</Text></View>
            
           
            <ListItem.Content >
                <ListItem.Title >
                {/* <Badge value={item.count} status="success" /> */}
                </ListItem.Title>
                <View style={styles.box}>  
                   <Text style={styles.fontColor}>{item.merchant_name}</Text> 
                   <Text style={styles.fontColor}>{item.merchant_mobile}</Text> 
                   <Text style={styles.fontColor}> {item.merchant_address}</Text>    
                    {/* <ListItem.Subtitle style={styles.blue}>{item.count}</ListItem.Subtitle> */}
                </View>
            </ListItem.Content>
            <ListItem.Chevron />
  
        </ListItem.Swipeable>
    )
 
    return (
      <View>
        <Text style={styles.subHeader}>{order.name}</Text>
        {
            true ?
            <FlatList
        contentContainerStyle={styles.scrollView}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
                keyExtractor={keyExtractor}
                data={dataset}
                renderItem={renderItem}
        />
        :
        <Text style={styles.msg}>No Data Found</Text>
        }
       
          
      </View>
    )
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent : 'flex-start',
        // alignItems : 'flex-start'
  
    },
    subHeader: {
      backgroundColor : "#F7771D",
      color : "white",
      textAlign : "center",
      padding : 8,
      marginBottom : 5,
      letterSpacing : 0.5,
      fontSize : (_size * 40)/100
    },
    msg: {
        // backgroundColor : "#F7771D",
        // color : "white",
        textAlign : "center",
        padding : 8,
        marginBottom : 5,
        letterSpacing : 0.5,
        fontSize : (_size * 40)/100
      },

    number : {
        height : _size  ,
        width : _size ,
        backgroundColor : '#F7771D',
        borderRadius : 50,
        // display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        alignSelf : 'center'
    },
    numberText : {
        color: '#fff'
    },
  
    box: {
        // backgroundColor  : 'red',
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    pullBox: {
        //  height: 20,
  
    },
    blue: {
        color: '#0089E3',
        fontSize : Dimensions.get('window').width*7/100 
    },
    scrollView: {
        // flex: 1
        backgroundColor: 'green'
    },
    fontColor : {
        color:'black'
    }
  })