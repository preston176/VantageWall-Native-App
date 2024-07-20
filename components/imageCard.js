import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { getImageSize, wp } from '../helpers/common'
import { theme } from '../constants/theme'

const ImageCard = ({ item, index, columns }) => {

    const isLastInRow = () => {
        return (index + 1) % columns === 0;
    }

    // console.log(item)
    // function to get image height
    const getImageHeight = () => {
        let { height: height, width: width } = item;
        return { height: getImageSize(height, width) }
    }
    return (
        <Pressable style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
            <Image style={[styles.image, getImageHeight()]} source={item.urls.small}
                placeholder={item.blur_hash}
                contentFit='cover'
                transition={100}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%'
    },
    imageWrapper: {
        backgroundColor: theme.colors.grayBG,
        borderRadius: theme.radius.xl,
        borderCurve: "continuous",
        overflow: "hidden",
        marginBottom: wp(2)
    },
    spacing: {
        marginRight: wp(2)
    }
})

export default ImageCard