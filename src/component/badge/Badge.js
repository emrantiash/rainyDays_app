import React from 'react'
import { Avatar, Badge, withBadge } from '@rneui/themed';

const WDBadge = (props) => {
    return (
        <Badge
            value={props.value}
            status={props.status}
        //   containerStyle={{ position: 'absolute', top: 5, left: 40 }}
        textStyle = {{fontSize:12}}
        // badgeStyle = {{backgroundColor : 'red',marginBottom:2}}
        marginBottom = {5}
        />
    )
}

export default WDBadge
