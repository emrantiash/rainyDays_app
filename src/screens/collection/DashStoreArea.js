import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { Button, ListItem, SpeedDial } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import { StoredAreaDataBranchWise, storeArea, StoredBranchDataSacCode } from '../../redux/slices/storeSlice';
import { signout } from '../../redux/slices/loginSlice';
import WDBadge from '../../component/badge/Badge';
import WDSkeleton from '../../component/skeleton/Skeleton';
import WDInput from '../../component/input/Input';

const _size = Dimensions.get('window').width * 10 / 100;

export default function DashStoreAreaScreen({ navigation }) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("")
    const token = useSelector((state) => state.loginReducer.data.token)
    const branch = useSelector((state) => state.storeReducer.branch)
    const [dataset, setDataset] = useState([]) //useSelector((state) => state.storeReducer.data)
    const [isLoading, setIsLoading] = useState(true)
    const [msg, setMsg] = useState(" ")

    const [success, setSuccess] = useState(false)

    const option = "branch_id=" + branch.id
    let combinedData = [option, token]

    // console.log(dataset)


    useEffect(() => {
        makeThisCallHappen()
    }, [])

    const makeThisCallHappen = () => {
        dispatch(StoredAreaDataBranchWise(combinedData)).then(function (e) {
            setDataset(e.payload.data)
            setIsLoading(false)
        })
    }

    const _storeThisDetails = (item) => {
        dispatch(storeArea(item))
        navigation.navigate('Store-Area-Details')
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            makeThisCallHappen()
            setRefreshing(false);
        }, 2000);
    });

    const _signOut = () => {
        dispatch(signout())
    }

    const changeText = (e) => {
        setValue(e)
        let option = {
            branch_sack_barcode: e,
            branch_id: branch.id,
            status: 2,
            flag : 3
        }

        let combinedData = [option, token]

        dispatch(StoredBranchDataSacCode(combinedData)).then(function (e) {
            if (e.payload.success) {
                setSuccess(true)
                setMsg("Successfully Branch Code Added")
            }
            else{
                setSuccess(false)
                setMsg("Something wrong.") 
            }
        })
    }


    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable

            // leftContent={(reset) => (
            //     <Button
            //         title="Sac No"
            //         onPress={() => _storeThisDetails(item)}
            //         icon={{ name: 'key', color: 'white' }}
            //         buttonStyle={{ minHeight: '100%', backgroundColor: 'orange' }}
            //     />
            // )}


            rightContent={(reset) => (
                item.sack_barcode == "" &&
                <Button
                    title="Details"
                    onPress={() => _storeThisDetails(item)}
                    icon={{ name: 'description', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#00CC83' }}
                />
            )}
        >

            <WDIcon name="rss" size={_size} color={item.sack_barcode != "" ? 'green' : 'red'} />

            <ListItem.Content >
                <ListItem.Title >
                    {/* <Badge value={item.count} status="success" /> */}
                </ListItem.Title>
                <View style={styles.box}>
                    <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
                    {/* <WDBadge value={item.sack_barcode} status="warning" /> */}

                    <ListItem.Subtitle style={styles.blue}>
                        <WDBadge value={item.count} status="warning" />
                    </ListItem.Subtitle>
                </View>
            </ListItem.Content>
            {/* <ListItem.Chevron /> */}


        </ListItem.Swipeable>
    )



    return (
        <View style={styles.container}>
            <Text style={styles.subHeader}>{branch.branch_name}</Text>
            <WDInput
                placeholder="Scan Branch Sac Code"
                value={value}
                onChangeText={(e) => changeText(e)}
            />
            {
                // success &&
                <Text style={[styles.textMsg,{
                    color : success ? 'green' : 'red'
                }]}>{msg}</Text>
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

            {/* <SpeedDial
                isOpen={open}
                icon={{ name: 'edit', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
            >

                <SpeedDial.Action
                    icon={{ name: 'home', color: '#fff' }}
                    title="Home"
                    onPress={() => navigation.navigate('Receive')}
                />
                <SpeedDial.Action
                    icon={{ name: 'logout', color: '#fff' }}
                    title="log out"
                    onPress={() => _signOut()}
                />
            </SpeedDial> */}
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
        backgroundColor: "#FF6666",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        padding: 8,
        marginBottom: 5,
        letterSpacing: 0.5,
        fontSize: (_size * 40) / 100
    },
    textMsg : {
        marginLeft : _size*50/100 
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