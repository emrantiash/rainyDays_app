import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStoreCheckOrderDetails, storeBarcode, StoreChangeOrderStatus,StoredAreaDataSacCode } from '../../redux/slices/storeSlice'
import { Button, ListItem, } from '@rneui/themed';
import WDIcon from '../../component/icon/Icon';
import WDInput from '../../component/input/Input';
import WDBadge from '../../component/badge/Badge';
import { signout } from '../../redux/slices/loginSlice';
const _size = Dimensions.get('window').width * 15 / 100;

export default function DashStoreAreaOrderDetailsScreen() {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState("")
  const token = useSelector((state) => state.loginReducer.data.token)
  const [dataset, setDataset] = useState([])
  const area = useSelector((state) => state.storeReducer.area)
  const [msg, setMsg] = useState("")
  const [count, setCount] = useState(0)
  const [receivedCode, setReceivedCode] = useState([])
  const [success, setSuccess] = useState(false)

  const option = "area_id=" + area.area_id + "&status=2"

  let combinedData = [option, token]

  useEffect(() => {
    dispatch(getStoreCheckOrderDetails(combinedData)).then(function (e) {
      if (e.payload.success) {
        setDataset(e.payload.data)
      }
    })
  }, [])

  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getStoreCheckOrderDetails(combinedData)).then(function(e){
        if (e.payload.success) {
          setDataset(e.payload.data)
        }
      })
      setRefreshing(false);
    }, 2000);
  }, []);

  const checkMyBarCodeAvailable = (_barcode) =>{
    var _flag = false 
    dataset.map((data,index)=>{
      if(data.barcode==_barcode)
      _flag = true 
    })

    return _flag 

  }

  const changeText = (e) => {
     setMsg("")
    setValue(e)
    const option = "barcode=" + e +"&flag=1"
    let combinedData = [option, token]
    checkMyBarCodeAvailable(e) && setReceivedCode(receivedCode => [...receivedCode, e]);
    setCount(setCount + 1)
    setValue("")
    dispatch(StoreChangeOrderStatus(combinedData)).then(function (e) {
      if (e.payload.success) {

        // console.log("success")

      }
      if (!e.payload.success) {
        setMsg(e.payload.error)
      }
      setValue("")
    })
  }


  const changeTextSacCode = (e) =>{
    setValue(e)
    let option = {
      sack_barcode : e,
      barcode : receivedCode,
      flag : 2 
    }
    let combinedData = [option, token]
    dispatch(StoredAreaDataSacCode(combinedData)).then(function(e){
      console.log(e.payload)
      if(e.payload.success){
        setSuccess(e.payload.success)
        setMsg("Sac Code Added")
      }
      else{
        setMsg("Something Wrong")
      }
    })

  }

  const _checkBackground = (barcode) => {
    var _flag = false
    receivedCode.map((data, index) => {
      if (data == barcode)
        _flag = true
    })
    return _flag

  }

  const keyExtractor = (item, index) => index.toString()
  // const checkBackground = flag && ''

  const renderItem = ({ item }) => (

    <ListItem.Swipeable
    >

      <WDIcon name="folder" size={_size} color="red" />

      <ListItem.Content >
        <ListItem.Title >
          {/* <Badge value={item.count} status="success" /> */}
        </ListItem.Title>
        <View style={[styles.box, _checkBackground(item.barcode) ? {
          backgroundColor: '#E05320',
          color: 'white',
          padding: 5,
          borderRadius: 5
        } : { backgroundColor: 'white' }]}>
          <ListItem.Subtitle>{item.reference_id}</ListItem.Subtitle>
          <ListItem.Subtitle style={{}}>{item.barcode}{_checkBackground(item.barcode)}</ListItem.Subtitle>
          {/* <ListItem.Subtitle style={styles.blue}>
                <WDBadge value={item.count} status="warning" />
              </ListItem.Subtitle> */}
        </View>
      </ListItem.Content>
      {/* <ListItem.Chevron /> */}


    </ListItem.Swipeable>
  )

  return (
    <View style={styles.container}>
       {
            receivedCode.length == dataset.length ?
          <WDInput
            placeholder="Enter Sac Number"
            value={value}
            onChangeText={(e) => changeTextSacCode(e)}
          />
          :
          <WDInput
          placeholder="Scan barcode"
          value={value}
          onChangeText={(e) => changeText(e)}
        />
        }
      <View>
        <Text style={styles.subHeader}>{area.name}</Text>
        

       

        <Text style={[styles.textMsg,{color : success ? 'green' : 'red'}]}>{msg}</Text>
        <WDBadge value={receivedCode.length} status="warning" />
      </View>


      <FlatList
        contentContainerStyle={styles.scrollView}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
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
    backgroundColor: '#fff',
    // flexDirection : 'column'
    // justifyContent: 'flex-start',
    // alignItems : 'flex-start'

  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    padding: 8,
    marginBottom: 5,
    letterSpacing: 0.5,
    fontSize: (_size * 30) / 100
  },

  array: {
    //  flex : 1,
    // margin: 2,
    flexDirection: 'row'
  },
  textMsg : {
    marginLeft : _size*50/100 ,
    color : 'red'
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