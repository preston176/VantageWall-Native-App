import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated'


const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Image
                style={styles.bgImage}
                source={require("../assets/images/welcome.png")}
                resizeMode='cover'
            />
            {/* background gradient */}
            <Animated.View entering={FadeInUp.duration(900)} style={{ flex: 1 }}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0.2 }}
                    end={{ x: 0.5, y: 0.8 }}
                />
            </Animated.View>
            {/* end of background gradient */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        width: wp(100),
        height: hp(100),
        position: "absolute"
    },
    gradient: {
        width: wp(100),
        height: hp(65),
        bottom: 0,
        position: 'absolute'
    }
})

export default WelcomeScreen

