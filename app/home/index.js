import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome6 } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { StyleSheet } from 'react-native-web';
import { hp, wp } from '../../helpers/common';

const HomeScreen = () => {
    // initialize a destructured top to get safearea view based on mobile platform; android or iOS
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    return (
        <View style={[styles.container, { paddingTop }]}>
            {/* header start */}
            <View style={styles.header}>
                <Pressable>
                    <Text style={styles.title}>
                        WalliFy
                    </Text>
                </Pressable>
                <Pressable>
                    <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.9)} />
                </Pressable>
            </View>
            {/* header end */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15
    },
    header: {
        marginHorizontal: wp(4),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9)
    },
})

export default HomeScreen