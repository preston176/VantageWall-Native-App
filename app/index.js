import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { theme } from './../constants/theme';
import { useRouter } from "expo-router"



const WelcomeScreen = () => {
    const router = useRouter();


    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Image
                style={styles.bgImage}
                source={require("../assets/images/welcome.png")}
                resizeMode='cover'
            />
            {/* background gradient */}
            <Animated.View entering={FadeInDown.duration(700)} style={{ flex: 1 }}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0.2 }}
                    end={{ x: 0.5, y: 1 }}
                />

                {/* end of background gradient */}
                {/* Start of Welcome screen Content */}
                <View style={styles.contentContainer}>
                    <Animated.Text
                        entering={FadeInDown.delay(500).springify()}
                        style={styles.title}>
                        VantageWall
                    </Animated.Text>
                    <Animated.Text
                        entering={FadeInDown.delay(500).springify()}
                        style={styles.punchLine}>
                        Define Your WallPaper
                    </Animated.Text>
                    <Animated.View
                        entering={FadeInDown.delay(500)}>
                        <Pressable onPress={() => router.push('home')} style={styles.startButton}>
                            <Text style={styles.startText}>Get Started</Text>
                        </Pressable>
                    </Animated.View>
                </View>
                {/* End of Welcome screen Content */}
            </Animated.View>
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
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 16

    },
    title: {
        fontSize: hp(6),
        color: theme.colors.neutral(0.9),
        fontWeight: theme.fontWeights.bold
    },
    punchLine: {
        fontSize: hp(2),
        letterSpacing: 1,
        marginBottom: 10,
        fontWeight: theme.fontWeights.medium
    },
    startButton: {
        marginBottom: 50,
        backgroundColor: theme.colors.neutral(0.9),
        padding: 15,
        paddingHorizontal: 90,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous'
    },
    startText: {
        color: theme.colors.white,
        fontSize: hp(3),
        fontWeight: theme.fontWeights.medium,
        letterSpacing: 2
    }
})

export default WelcomeScreen

