import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { getImageSize } from '../helpers/common'

const ImageCard = ({ item, index }) => {
    // console.log(item)
    // function to get image height
    const getImageHeight = () => {
        let { height: height, width: width } = item;
        return { height: getImageSize(height, width) }
    }
    return (
        <Pressable>
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
})

export default ImageCard