import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { SpeedDial } from '@rneui/themed';

const WDSpeedDial = (props,navigation) => {
    const [open, setOpen] = useState(false);

    const _goHome = () =>{
        navigation.navigate('DHome')
    }
    return (
            <SpeedDial
                isOpen={open}
                icon={{ name: 'edit', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
            >
                <SpeedDial.Action
                    icon={{ name: 'home', color: '#fff' }}
                    title="Home"
                    onPress={props.onPress}
                />
                {/* <SpeedDial.Action
                    icon={{ name: 'delete', color: '#fff' }}
                    title="Delete"
                    onPress={() => console.log('Delete Something')}
                /> */}
            </SpeedDial>
        
    )
}

export default WDSpeedDial