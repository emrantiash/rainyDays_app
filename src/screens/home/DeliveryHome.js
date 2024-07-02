import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import { checkStatusPage ,getDashBoardData } from '../../redux/slices/deliverySlice';
import { signout } from '../../redux/slices/loginSlice';
import { Button, ListItem, SpeedDial } from '@rneui/themed';
import WDBadge from '../../component/badge/Badge';
import WDIcon from '../../component/icon/Icon';
import WDSkeleton from '../../component/skeleton/Skeleton';

export default function DeliveryHomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state) => state.loginReducer.data.token)
  const [isLoading, setIsLoading] = useState(true)
  const data = useSelector((state) => state.deliveryReducer.data)


  const dashBoard = () => {
    dispatch(getDashBoardData(token)).then(function (e) {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    dashBoard()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dashBoard()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dashBoard()
      setRefreshing(false);
    }, 2000);
  }, []);

  const _goForApproave = () => {
    data.count_status_5 > 0 && navigation.navigate('Show-Order')
  }

  const _goNewOrder = (status) => {
    dispatch(checkStatusPage(status))
    status == 6 && 
    data.count_status_6 > 0 && navigation.navigate('New-Order')
    status == 7 && 
    data.count_status_7 > 0 && navigation.navigate('New-Order')
  }

  const _signOut = () => {
    dispatch(signout())
  }
  return (
    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.pullBox}></View>

        <View style={styles.inContainer}>
          <View style={styles.box}>
            <TouchableOpacity style={styles.box}
              onPress={_goForApproave}
            >
              <WDIcon name="new" size={50} color="orange" style={styles.iconText} />
              <Text style={styles.iconText} >Assigned
                <WDBadge value={data && data.count_status_5} status="error"
                />
              </Text>
            </TouchableOpacity>

          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.box}
              onPress={()=>_goNewOrder(6)}
            >
              <WDIcon name="shop" size={50} color="orange" style={styles.iconText} />
              <Text style={styles.iconText} >New<WDBadge
                value={data && data.count_status_6}
                status="success"
              />
              </Text>
            </TouchableOpacity>

          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.box}
             onPress={()=>_goNewOrder(7)}
            >
              <WDIcon name="shop" size={50} color="orange" style={styles.iconText} />
              <Text style={styles.iconText} >Deliver<WDBadge
                value={data && data.count_status_7}
                status="success"
              />
              </Text>
            </TouchableOpacity>

          </View>

        </View>
        <View style={styles.inContainer}>
          <View style={styles.box}>
            <TouchableOpacity style={styles.box}
            // onPress={()=>_goPickOrder('Van')}
            >
              <WDIcon name="shop" size={50} color="orange" style={styles.iconText} />
              <Text style={styles.iconText} >Receivable
                <WDBadge value={data && data.receivable_amount} status="primary"
                />
              </Text>
            </TouchableOpacity>

          </View>

          <View style={styles.box}>
            <WDIcon name="briefcase" size={50} color="orange" style={styles.iconText} />
            <Text style={styles.iconText}>Collection
              <WDBadge value={data && data.collected_amount} status="success"
              />

            </Text>
          </View>
          <View style={styles.box}>
            <WDIcon name="rss" size={50} color="orange" style={styles.iconText} />
            <Text style={styles.iconText}>Setting

            </Text>
          </View>

        </View>
        {
          isLoading &&
          <WDSkeleton />
        }


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
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  inContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  box: {

    flex: 1,

    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  iconText: {
    textAlign: 'center'
  }
})