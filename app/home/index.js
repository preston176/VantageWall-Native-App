import { View, Text, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { StyleSheet } from 'react-native-web';
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from './../../components/imageGrid';

const HomeScreen = () => {
    // initialize a destructured top to get safearea view based on mobile platform; android or iOS
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    // states
    const [search, setSearch] = useState('');
    const [images, setImages] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    // reference
    const searchInputRef = useRef(null);
    // function to clear text
    const handleClear = () => {
        setSearch('');
    }
    useEffect(() => {
        // fetch images
        fetchImages();
    }, []);
    const fetchImages = async (parameters = { page: 1 }, append = false) => {
        let res = await apiCall(parameters);
        console.log('result got', res.data)
        if (res.success && res?.data) {
            const fetchedImages = res?.data.map(image => image);
            if (append) {
                setImages([...images, ...fetchedImages]);
            } else {
                setImages([...fetchedImages]);
            }
        }
    }
    
    


    const handleChangeCategory = (category) => {
        setActiveCategory(category)
    }

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
            <ScrollView contentContainerStyle={{ gap: 15 }}>
                {/* Search bar */}
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
                    </View>
                    <TextInput
                        placeholder="Type to Search ..."
                        style={styles.searchInput}
                        ref={searchInputRef}
                        value={search}
                        onChange={value => setSearch(value)}
                    />
                    {/* conditionally render the close button */}
                    {
                        search && (
                            <Pressable
                                onPress={handleClear}
                                style={styles.closeIcon}>
                                <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
                            </Pressable>
                        )
                    }

                </View>
                {/* end of search bar */}
                {/* categories section */}
                <View style={styles.categories}>
                    <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                </View>

                {/*  Images grid*/}
                <View>
                    {
                        images.length > 0 && <ImageGrid images={images} />
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
        backgroundColor: "transparent"
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
        color: theme.colors.neutral(0.9),
        backgroundColor: theme.colors.neutral(0)
    },
    searchBar: {
        marginHorizontal: wp(4),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        backgroundColor: theme.colors.white,
        padding: 6,
        paddingLeft: 10,
        borderRadius: theme.radius.lg
    },
    searchInput: {
        flex: 1,
        borderRadius: theme.radius.sm,
        paddingVertical: 10,
        fontSize: hp(1.8),
        marginLeft: 10
    },
    closeIcon: {
        backgroundColor: theme.colors.neutral(0.2),
        padding: 8,
        borderRadius: theme.radius.sm
    },
    categories: {},
})

export default HomeScreen