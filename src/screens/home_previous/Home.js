import React from 'react';
import { View, Text, StyleSheet ,FlatList,RefreshControl} from 'react-native';
import { Button ,Icon ,ListItem, Avatar} from '@rneui/themed';
import { Input } from '@rneui/base';

// import image from '../../assets/images/n.png'

const list = [
  {
    name: 'Mili Faisal',
    mobile : '01768009215',
    bulk : true ,
    area : 'Dhanmondi'
  },
  {
    name: 'Fattah mahmud',
    mobile : '01768009215',
    bulk : true ,
    area : 'Bonani'
  },
  {
    name: 'Amy Farha',
    mobile : '01768009215',
    area : 'Dhanmondi'
  },
  {
    name: 'Chris Jackson',
    mobile : '01768009215',
    area : 'Mirpur'
  },
  {
    name: 'Amy Farha',
    mobile : '01768009215',
    area : 'Dhanmondi'
  },
  {
    name: 'Chris Jackson',
    mobile : '01768009215',
    area : 'Dhanmondi'
  },
  {
    name: 'Amy Farha',
    mobile : '01768009215',
    area : 'Dhanmondi'
  },
  {
    name: 'Chris Jackson',
    mobile : '01768009215',
    area : 'Dhanmondi'
  },
  {
    name: 'Amy Farha',
    mobile : '01768009215',
    area : 'Dhanmondi'
  },
  {
    name: 'Chris Jackson',
    mobile : '01768009215',
    area : 'Dhanmondi'
  }
]

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem.Swipeable
        leftContent={(reset) => (
          <Button
            title="Info"
            onPress={() => reset()}
            icon={{ name: 'info', color: 'white' }}
            buttonStyle={{ minHeight: '100%' }}
          />
        )}
        rightContent={(reset) => (
          <Button
            title="Details"
            onPress={() => navigation.navigate('Details')}
            icon={{ name: 'description', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: '#00CC83' }}
          />
        )}
      >

      <Avatar source={item.bulk ? require('../../assets/images/b.png') : require('../../assets/images/n.png')} />
      <ListItem.Content >
        <ListItem.Title >{item.name}</ListItem.Title>
        <View style={styles.box}>
        <ListItem.Subtitle>{item.mobile}</ListItem.Subtitle>
        <ListItem.Subtitle style={styles.blue}>{item.area}</ListItem.Subtitle>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />

    </ListItem.Swipeable>
  )

  return (
    <View style={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <Text>Pull down to see RefreshControl indicator</Text>
    <Input />
    
      <FlatList
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
    />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },

 box : {
  flex:1,
  width : '100%',
  flexDirection : 'row',
  justifyContent : 'space-between'
 },
 blue :{
  color : '#0089E3'
 }
})


