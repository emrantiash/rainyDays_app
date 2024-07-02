import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignedDetails,storeThisItem } from '../../redux/slices/deliverySlice';
import { Button, ListItem } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import WDSkeleton from '../../component/skeleton/Skeleton';
import WDBadge from '../../component/badge/Badge';

const _size = Dimensions.get('window').width * 10 / 100;

export default function DeliveryAssignedOrderScreen({navigation}) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const token = useSelector((state) => state.loginReducer.data.token)
    const [dataset, setDataset] = useState([])
    const option = "status=5"
    let combinedData = [option, token]

    const getAssignedCall = () => {
        dispatch(assignedDetails(combinedData)).then(function (e) {
            setDataset(e.payload.data)
            setIsLoading(false)
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
        navigation.navigate('Approave-Order')

    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable
            rightContent={(reset) => (
                <Button
                    title="Details"
                    onPress={() => _storeItem(item)}
                    icon={{ name: 'description', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#FF1493' }}
                />
            )}

        >

            <WDIcon name="documents" size={_size} color="red" />

            <ListItem.Content style={styles.listItem}>
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
           
            <Text style={styles.subHeader}>All Assigned Order</Text>
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
    }
})