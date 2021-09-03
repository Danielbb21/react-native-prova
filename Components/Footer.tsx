import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils'
const {PRIMARY_COLOR} = colors;
const Footer = () => {
    return (
        <View style = {styles.footer}>
            <Text style = {styles.footerText}>Copyright 2020 Luby Software</Text>
        </View>
    )
}

export default Footer


const styles = StyleSheet.create({
    footer:{
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    footerText:{
        textAlign: 'center',
        color: PRIMARY_COLOR,
        fontSize: 15,
        fontWeight: 'normal'
    }
})