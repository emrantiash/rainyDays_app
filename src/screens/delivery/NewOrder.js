import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignedDetails,storeThisItem } from '../../redux/slices/deliverySlice';
import { Button, ListItem } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import WDSkeleton from '../../component/skeleton/Skeleton';
import WDBadge from '../../component/badge/Badge';
import WDSpeedDial from '../../component/speedDial/SpeedDial';

const _size = Dimensions.get('window').width * 10 / 100;

export default function NewOrderScreen({navigation}) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const token = useSelector((state) => state.loginReducer.data.token)
    const [dataset, setDataset] = useState([])
    const [error,setError] = useState("")
    const checkStatus = useSelector((state)=>state.deliveryReducer.status)
    console.log(checkStatus)
    const option = "status="+checkStatus
    let combinedData = [option, token]

    const getAssignedCall = () => {
        dispatch(assignedDetails(combinedData)).then(function (e) {
            if(e.payload && e.payload.success)
            {
                setDataset(e.payload &&  e.payload.data)
                setIsLoading(false)
            }
            else
            {
                setIsLoading(false)
                setError("Check Internet Connection")
            }
           
        })
    }

    useEffect(() => {
        getAssignedCall()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAssignedCall()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const onRefresh = React.useCallback(() => {

        setRefreshing(true);
        setTimeout(() => {
            getAssignedCall()
            setRefreshing(false);
        }, 2000);
    }, []);

    const _storeItem = (item) => {
        dispatch(storeThisItem(item))
        navigation.navigate('My-Customer')

    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable
            rightContent={(reset) => (
                <Button
                    title="inside"
                    onPress={() => _storeItem(item)}
                    icon={{ name: 'description', color: 'orange' }}
                    buttonStyle={{ minHeight: '100%', borderRadius:8 }}
                />
            )}

        >

            <WDIcon name="documents" size={_size} color="orange" />

            <ListItem.Content style={styles.listItem} onPress={() => _storeItem(item)}>
                <ListItem.Title >

                </ListItem.Title>
                <View style={styles.box}>
                    <ListItem.Subtitle>{item.name}</ListItem.Subtitle>

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
                {
                    checkStatus == 6 ? 'My Order' : 'My Delivery'
                }
                
                </Text>
            {
                isLoading  &&
                <WDSkeleton />
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
            <WDSpeedDial 
            onPress={() => navigation.navigate('Home')}
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
        backgroundColor: 'green'
    }
})