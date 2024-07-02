import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import { getOrder } from '../../redux/slices/orderSlice';
import { signout } from '../../redux/slices/loginSlice';
import { Button, ListItem, SpeedDial } from '@rneui/themed';
import WDBadge from '../../component/badge/Badge';
import WDIcon from '../../component/icon/Icon';
import StoreHome from './StoreHome';

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const token = useSelector((state) => state.loginReducer.data.token)
    const user = useSelector((state) => state.loginReducer)
    const data = useSelector((state) => state.orderReducer.data)
    const total_order = data ? data.total_order : 0

    const role = user.data.data.role

    // console.log("=====data====", data.branch_sack_barcode_count)
    console.log(data)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            dispatch(getOrder(token))
            setRefreshing(false);
        }, 2000);
    }, []);

    const _signOut = () => {
        dispatch(signout())
    }
    useEffect(() => {
        dispatch(getOrder(token))
    }, [])

    const _goOrder = () => {
        total_order > 0 && navigation.navigate('Order')
    }

    const _goPickOrder = (_path) => {
        // data.branch_sack_barcode_count > 0 && 
        navigation.navigate(_path)
    }

    return (

        <>
            {
                role == 1 ?
                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }>
                        <View style={styles.rootContainer}>
                            {/* <View style={styles.pullBox}></View> */}

                            <View style={styles.containerJar}>
                                <View style={styles.box}>
                                    <TouchableOpacity style={styles.box} onPress={_goOrder}>
                                        <WDIcon name="new" size={50} color="orange" style={styles.iconText} />
                                        <Text style={[styles.iconText,styles.colorBlack]} >New Order
                                            <WDBadge value={total_order} status="success"
                                            />
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.box}>
                                    <TouchableOpacity style={styles.box} onPress={() => _goPickOrder('Pick-Van')}>
                                        <WDIcon name="shop" size={50} color="orange" style={styles.iconText} />
                                        <Text style={[styles.iconText,styles.colorBlack]}  >Store-Pick<WDBadge
                                            value={data.branch_sack_barcode_count}
                                            status="success"
                                        />
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.box}>
                                    <TouchableOpacity style={styles.box} onPress={() => _goPickOrder('Van')}>
                                        <WDIcon name="shop" size={50} color="orange" style={styles.iconText} />
                                        <Text style={[styles.iconText,styles.colorBlack]}  >Van<WDBadge value={data.van} status="success"
                                        />
                                        </Text>
                                    </TouchableOpacity>

                                </View>


                            </View>
                            <View style={styles.containerJar}>
                              
                                <View style={styles.box}>
                                    <WDIcon name="briefcase" size={50} color="orange" style={styles.iconText} />
                                    <Text style={[styles.iconText,styles.colorBlack]} >Report

                                    </Text>
                                </View>
                                <View style={styles.box}>
                                    <WDIcon name="rss" size={50} color="orange" style={styles.iconText} />
                                    <Text style={[styles.iconText,styles.colorBlack]} >Setting

                                    </Text>
                                </View>

                               
                            </View>
                            
                            
                        </View>


                    </ScrollView>
                    <SpeedDial
                                isOpen={open}
                                icon={{ name: 'edit', color: '#fff' }}
                                openIcon={{ name: 'close', color: '#fff' }}
                                onOpen={() => setOpen(!open)}
                                onClose={() => setOpen(!open)}
                                overlayColor=""
                            >
                               

                               
                                <SpeedDial.Action
                                    icon={{ name: 'logout', color: '#fff' }}
                                    title="log out"
                                    onPress={() => _signOut()}
                                />
                            </SpeedDial>
                    </View>
                    :
                    <View style={styles.container}>
                        <StoreHome />
                        <TouchableOpacity style={styles.box} onPress={_signOut}>
                            <WDIcon name="new" size={50} color="orange" style={styles.iconText} />
                            <Text style={styles.iconText}>log Out

                            </Text>
                        </TouchableOpacity>
                    </View>
            }


        </>

    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
      },
    rootContainer: {
        // flex: 1,
        //  backgroundColor: '#fff',
        //  justifyContent: 'flex-start',
    },
    containerJar: {
        margin: 10,
        flexDirection: 'row',
    },
    box: {

        flex: 1,

        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    iconText: {
        textAlign: 'center',
    //    color : 'orange'
    },
    colorBlack : {
        color : '#000'
    }
})


