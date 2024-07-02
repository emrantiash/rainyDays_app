import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignedDetailsMore,receiveTheOrder } from '../../redux/slices/deliverySlice';
import { Button, ListItem } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import WDSkeleton from '../../component/skeleton/Skeleton';
import WDBadge from '../../component/badge/Badge';

const _size = Dimensions.get('window').width * 10 / 100;

export default function DeliveryAssignedOrderDetails() {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const token = useSelector((state) => state.loginReducer.data.token)
    const user = useSelector((state) => state.loginReducer.data.data.id)
    const [dataset, setDataset] = useState([])
    const data = useSelector((state)=>state.deliveryReducer.item)
    // console.log(data)
    const option = "status=5&area_id="+data.area_id+"&delivery_officer_id="+user 
    let combinedData = [option, token]

    const makeTheApiCall = () => {
        dispatch(assignedDetailsMore(combinedData)).then(function (e) {
            setDataset(e.payload.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
         makeTheApiCall()
        // dispatch(assignedDetailsMore(combinedData)).then(function(){
        //     setIsLoading(false)
        // })
    }, [])

    const onRefresh = React.useCallback(() => {

        setRefreshing(true);
        setTimeout(() => {
            makeTheApiCall()
            setRefreshing(false);
        }, 2000);
    }, []);

    const _accecptThisOrder = (item) =>{
        const option = "id="+item.id+"&status=6"
        let combinedData = [option, token]
        dispatch(receiveTheOrder(combinedData)).then(function(e){
            console.log(e.payload.data.id,e.payload.success)
            if(e.payload.success){
                const _array = dataset.filter((item)=>item.id !== e.payload.data.id)
                // action.payload &&  action.payload.data && state.order.filter((item) => item.barcode !== action.payload.data.barcode)
                setDataset(_array)
            }
        })

    }
    
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable
            rightContent={(reset) => (
                <Button
                    title="Receive"
                    onPress={() => _accecptThisOrder(item)}
                    icon={{ name: 'description', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: 'orange' }}
                />
            )}

        >

            <WDIcon name="folder" size={_size} color="#FF1493" />

            <ListItem.Content style={styles.listItem}>
                <ListItem.Title >

                </ListItem.Title>
                <View style={styles.box}>
                    <ListItem.Subtitle>{item.reference_id}</ListItem.Subtitle>

                    <ListItem.Subtitle style={styles.blue}>
                        {/* <WDBadge value={item.count} status="success" /> */}
                    </ListItem.Subtitle>
                </View>
            </ListItem.Content>
            <ListItem.Chevron />

        </ListItem.Swipeable>
    )

  return (
    <View style={styles.container}>
           
            <Text style={styles.subHeader}>{data.name}</Text>
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