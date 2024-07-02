import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Stack, Skeleton } from '@rneui/themed';
import { FAB } from '@rneui/themed';

const _size = Dimensions.get('window').width * 15 / 100;

export default function WDSkeleton() {
    return (
        <View >
          
                {/* <Skeleton circle width={40} height={40} style={styles.inside} />
                <Skeleton circle width={40} height={40} style={styles.inside} />
                <Skeleton circle width={40} height={40} style={styles.inside} /> */}
                <FAB
        loading
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        size="small"
      />
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
         flex : 1,
         width: '100%',
         justifyContent : 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inside: {
        // justifyContent: 'center',
        // alignItems: 'center',
        margin :2 ,
        // padding: 5,
        backgroundColor: 'orange',
        // borderRadius : 40/2
    }
})