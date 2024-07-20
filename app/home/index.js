import { View, Text, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { StyleSheet } from 'react-native-web';
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/categories';
import { apiCall, apiSearchCall } from '../../api';
import ImageGrid from './../../components/imageGrid';
import { debounce } from 'lodash';

const HomeScreen = () => {
    // initialize a destructured top to get safearea view based on mobile platform; android or iOS
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    // states
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false)
    const [images, setImages] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    // reference
    const searchInputRef = useRef(null);
    // function to clear text
    const handleClear = () => {
        setSearch('');
        setIsSearching(false);
        searchInputRef?.current.clear();
    }
    useEffect(() => {
        // fetch images
        fetchImages();
    }, [search]);
    const fetchImages = async (parameters = { page: 1 }, append = false) => {
        // console.log(parameters, isSearching)
        if (isSearching === false) {

            let res = await apiCall(parameters);
            // console.log('result got', res.data)
            if (res.success && res?.data) {
                const fetchedImages = res?.data.map(image => image);
                if (append) {
                    setImages([...images, ...fetchedImages]);
                } else {
                    setImages([...fetchedImages]);
                }
            }
            return;
        } else {
            if (isSearching === true) {
                let res = await apiSearchCall(parameters);
                // console.log('result got', res.data);

                if (res.success && res?.data) {
                    // Extract the results array from the response
                    const fetchedImages = res.data.results.map(image => image);

                    if (append) {
                        setImages([...images, ...fetchedImages]);
                    } else {
                        setImages([...fetchedImages]);
                    }
                }
                return;
            }
        }
    }




    const handleChangeCategory = (category) => {
        return new Promise((resolve, reject) => {
            // Update state
            setActiveCategory(category);
            handleClear();
            setIsSearching(true);
            setSearch(category);
            setImages([]);

            // Initialize page and parameters
            let page = 1;
            let parameters = {
                page,
                query: category,
            };

            // Fetch images with the specified parameters
            fetchImages(parameters, false)
                .then(() => {
                    resolve();  // Resolve the promise when fetchImages completes
                })
                .catch((error) => {
                    reject(error);  // Reject the promise if there is an error
                });
        });
    };


    const handleSearch = (text) => {
        setSearch(text);
        if (text.length > 2) {
            // enable searching state
            setIsSearching(true);
            // then search this text
            page = 1;
            setImages([]);
            setActiveCategory(null);
            fetchImages({ page, query: text }, false)


        }
        if (text === "") {
            // reset the search results
            setIsSearching(false)
            page = 1;
            setImages([]);
            fetchImages({ page }, false);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

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
                        // value={search}
                        onChangeText={handleTextDebounce}
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