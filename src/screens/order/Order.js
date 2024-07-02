import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView,Dimensions } from 'react-native';
import { storeOrderData } from '../../redux/slices/orderSlice';
import { Button, ListItem, Avatar,Badge } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';

const _size =  Dimensions.get('window').width*15/100 ;

export default function OrderScreen({ navigation }) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const data = useSelector((state) => state.orderReducer.data)
    const dataset = data.area_wise_count

    console.log(dataset)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(()=>{
       dataset &&  dataset.length == 0 &&
        navigation.navigate('Dashboard')
    })

    const getItemStore = (item) =>{
         dispatch(storeOrderData(item))
        // navigation.navigate('Order-Details')
        navigation.navigate('Order-Merchant')
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable
            // leftContent={(reset) => (
            //     <Button
            //         title="Info"
            //         onPress={() => reset()}
            //         icon={{ name: 'info', color: 'white' }}
            //         buttonStyle={{ minHeight: '100%' }}
            //     />
            // )}
            rightContent={(reset) => (
                <Button
                    title="Details"
                    onPress={() => getItemStore(item)}
                    icon={{ name: 'description', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#00CC83' }}
                />
            )}
        >

            <WDIcon name="folder" size={_size} color="orange" />
           
            <ListItem.Content >
                <ListItem.Title >
                <Badge value={item.count} status="success" />
                </ListItem.Title>
                <View style={styles.box}>
                    <ListItem.Subtitle>{item.mobile}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.blue}>{item.name}</ListItem.Subtitle>
                </View>
            </ListItem.Content>
            <ListItem.Chevron />

        </ListItem.Swipeable>
    )

    return (
        <View style={styles.container}
        >
           <Text style={styles.subHeader}>New Order</Text>
            <FlatList
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
                //   horizontal
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
        justifyContent : 'flex-start',
        // alignItems : 'flex-start'

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
        color: '#0089E3'
    },
    scrollView: {
        // flex: 1
        backgroundColor: 'green'
    }
})


