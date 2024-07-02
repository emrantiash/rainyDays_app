import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderDetailsCustomerWise,storeThisCustomer,newPickDetails } from '../../redux/slices/deliverySlice';
import { Button, ListItem } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import WDSkeleton from '../../component/skeleton/Skeleton';
import WDBadge from '../../component/badge/Badge';

const _size = Dimensions.get('window').width * 10 / 100;

export default function NewOrderMerchantCountScreen({navigation}) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const token = useSelector((state) => state.loginReducer.data.token)
    const user = useSelector((state) => state.loginReducer.data.data.id)
    const [dataset, setDataset] = useState([])
    const data = useSelector((state)=>state.deliveryReducer.item)
    const checkStatus = useSelector((state)=>state.deliveryReducer.status)
     console.log(data)
    const option = "status="+checkStatus+"&area_id="+data.area_id 
    let combinedData = [option, token]

    const makeTheApiCall = () => {
        dispatch(orderDetailsCustomerWise(combinedData)).then(function (e) {
            setDataset(e.payload.data)
            setIsLoading(false)
        })
    }

    console.log(dataset)

    useEffect(() => {
         makeTheApiCall()
        
    }, [])
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            makeTheApiCall()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            makeTheApiCall()
            setRefreshing(false);
        }, 2000);
    }, []);

    const _orderDetails = (item) =>{
         dispatch(storeThisCustomer(item))
        //  const option = "status=6&delivery_officer_id="+user+"&customer_mobile="+item.customer_mobile
    //    navigation.navigate('Merchant-Order')

    console.log(item.count)
    // item.count == 1 ? navigation.navigate('Go-Order') : navigation.navigate('Multiple-Order')
    navigation.navigate('Go-Order')

    }

    const _callMarchant = (mobile) =>{
        const phoneNumber = mobile
        Linking.openURL(`tel:${phoneNumber}`)
      }
    
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable
        leftContent={(reset) => (
            <Button
                title="call"
                onPress={() => _callMarchant(item.customer_mobile)}
                icon={ <WDIcon name="mobile" size={_size} color="#fff" />}
                buttonStyle={{ minHeight: '100%' }}
            />
        )}
            rightContent={(reset) => (
                <Button
                    title="Go"
                    onPress={() => _orderDetails(item)}
                    icon={{ name: 'description', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: 'orange' }}
                />
            )}

        >

            <WDIcon name="folder" size={_size} color={checkStatus == 6 ? "orange" : "green"} />

            <ListItem.Content style={styles.listItem}>
                <ListItem.Title >

                </ListItem.Title>
                <View style={styles.box}>
                    <View style={styles.innerBox}>
                    <ListItem.Subtitle>{item.customer_name}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.customer_mobile}</ListItem.Subtitle>
                    </View>

                    <ListItem.Subtitle style={styles.blue}>
                        <WDBadge value={item.count} status="success" />
                    </ListItem.Subtitle>
                </View>
            </ListItem.Content>
            <ListItem.Chevron />

        </ListItem.Swipeable>
    )

  return (
    <View style={styles.container}>
           
            <Text style={styles.subHeader}>
                {data.name}({dataset.length})
                </Text>
                {
                    checkStatus == 7 && 
                    <Text style={styles.seven}>Delivery</Text>
                }
                
            {
                isLoading  &&
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#fff'

    },
    listItem : {
        margin : 1 ,
        padding : 1 
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
    seven: {
        backgroundColor: "red",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        padding: 8,
        // marginBottom: 5,
        letterSpacing: 0.5,
        fontSize: (_size * 30) / 100
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
    msg : {
        flex:1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})