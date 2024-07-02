import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState,useRef } from 'react'
import { Button, ListItem, SpeedDial } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import { storeData, getStoreCheckOrder } from '../../redux/slices/storeSlice';
import { signout } from '../../redux/slices/loginSlice';
import WDBadge from '../../component/badge/Badge';
import WDSkeleton from '../../component/skeleton/Skeleton';

const _size = Dimensions.get('window').width * 15 / 100;

export default function StoreHome({ navigation }) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const [open, setOpen] = useState(false);
    const token = useSelector((state) => state.loginReducer.data.token)
    const [dataset,setDataset] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const order = useRef(useSelector((state)=>state.storeReducer.order))

//    console.log(order.current != order)

    const option = "&status=1"
    let combinedData = [option, token]


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            dispatch(getStoreCheckOrder(combinedData)).then(function(e){
                setDataset(e.payload.data)
                setIsLoading(false)
            })
            setRefreshing(false);
        }, 2000);
    });

    useEffect(() => {
        dispatch(getStoreCheckOrder(combinedData)).then(function(e){
            if(e.payload.success){
                setDataset(e.payload.data)
                setIsLoading(false)
            }
        })
    }, [order.current != order])

    const _storeThisDetails = (item) => {
        dispatch(storeData(item))
        navigation.navigate('Store-Details')

    }

    const _signOut = () => {
        dispatch(signout())
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable

            rightContent={(reset) => (
                <Button
                    title="Details"
                    onPress={() => _storeThisDetails(item)}
                    icon={{ name: 'description', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#00CC83' }}
                />
            )}

        >

            <WDIcon name="drive" size={_size} color="green" />

            <ListItem.Content >
                <ListItem.Title >
                    {/* <Badge value={item.count} status="success" /> */}
                </ListItem.Title>
                <View style={styles.box}>
                    <ListItem.Subtitle>{item.pickup_officer_name}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.blue}>
                        <WDBadge value={item.count} status="warning" />
                    </ListItem.Subtitle>
                </View>
            </ListItem.Content>
            <ListItem.Chevron />


        </ListItem.Swipeable>
    )
    return (
        <View style={styles.container}>
           
            
            <Text style={styles.subHeader}>Pickup Order List</Text>
            {
                dataset == null &&
                <View style={styles.nodata}>
                    <Text style={styles.nodataText}>No Data Found</Text>
                </View>
            }
             {
                isLoading ?
                <WDSkeleton /> 
                :
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
            

            <SpeedDial
                isOpen={open}
                icon={{ name: 'edit', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
                overlayColor=""
            >
                 {/* <SpeedDial.Action
                    icon={{ name: 'book', color: '#fff' }}
                    title="Package"
                    onPress={() => navigation.navigate('Store-Report')}
                /> */}
               
                <SpeedDial.Action
                    icon={{ name: 'book', color: '#fff' }}
                    title="Pickup Report"
                    onPress={() => navigation.navigate('Store-Report')}
                />
                 <SpeedDial.Action
                    icon={{ name: 'logout', color: '#fff' }}
                    title="log out"
                    onPress={() => _signOut()}
                />
            </SpeedDial>
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
    nodata : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    nodataText :{
        color : '#097BED'
    },
    subHeader: {
        backgroundColor: "#FF6666",
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

