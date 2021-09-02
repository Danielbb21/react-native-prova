import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native';

const LogoElement = styled.Text`
    font-size: 44px;
   
`;

const Logo = () => {
    return (
        <View>
            <LogoElement>TGL</LogoElement>
        </View>
    )
}

export default Logo
