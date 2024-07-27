import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { StyleSheet } from 'react-native-web';
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/categories';
import { apiCall, apiSearchCall } from '../../api';
import ImageGrid from './../../components/imageGrid';
import FiltersModal from '../../components/filtersModal';

const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;

    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [images, setImages] = useState([]);
    const [filters, setFilters] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [page, setPage] = useState(1);
    const modalRef = useRef(null);

    const searchInputRef = useRef(null);

    const handleClear = () => {
        setSearch('');
        setIsSearching(false);
        searchInputRef?.current.clear();
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async (parameters = { page: 1 }, append = false) => {
        try {
            let res;
            if (isSearching) {
                res = await apiSearchCall(parameters);
            } else {
                res = await apiCall(parameters);
            }

            if (res.success && res?.data) {
                const fetchedImages = isSearching ? res.data.results : res.data;
                setImages(append ? [...images, ...fetchedImages] : fetchedImages);
            }
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };

    const openFiltersModal = () => {
        modalRef?.current?.present();
    }

    const closeFiltersModal = () => {
        modalRef?.current?.close();
    }
    const applyFilters = () => {
        if (filters) {

            setPage(1);
            setImages([]);
            let params = {
                page, ...filters
            }
            if (activeCategory) params.category = activeCategory;
            if (search) {
                params.query = search;
                return;
            } else params.query = "latest";

            fetchImages(params, false)
        }
        closeFiltersModal()

    }

    const resetFilters = () => {
        console.log("resestting filters");
        setFilters(null)
        setIsSearching(false);
        closeFiltersModal()
    }

    const handleChangeCategory = (category) => {
        return new Promise((resolve, reject) => {
            setActiveCategory(category);
            handleClear();
            setIsSearching(true);
            setSearch(category);
            setImages([]);
            setPage(1);

            fetchImages({ page: 1, query: category }, false)
                .then(() => resolve())
                .catch((error) => reject(error));
        });
    };

    const handleSearch = () => {
        if (search.length > 2) {
            setIsSearching(true);
            setPage(1);
            setImages([]);
            setActiveCategory(null);
            fetchImages({ page: 1, query: search }, false);
        } else if (search === "") {
            setIsSearching(false);
            setPage(1);
            setImages([]);
            fetchImages({ page: 1 }, false);
        }
    };

    return (
        <View style={[styles.container, { paddingTop }]}>
            <View style={styles.header}>
                <Pressable>
                    <Text style={styles.title}>
                        VantageWall
                    </Text>
                </Pressable>
                <Pressable onPress={openFiltersModal}>
                    <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.9)} />
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={{ gap: 15 }}>
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
                    </View>
                    <TextInput
                        placeholder="Type to Search ..."
                        style={styles.searchInput}
                        ref={searchInputRef}
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={handleSearch}
                    />
                    {/* search button */}
                    {search ? (
                        <Pressable
                            onPress={handleSearch}
                            style={styles.closeIcon}>
                            <Ionicons
                                name='search-outline'
                                size={24}
                                color={theme.colors.neutral(0.6)}
                            />
                        </Pressable>

                    ) : (
                        <Pressable
                            onPress={handleClear}
                            style={styles.closeIcon}>
                            <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
                        </Pressable>
                    )}
                    {/* search button */}
                </View>
                <View style={styles.categories}>
                    <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                </View>
                <View>
                    {images.length > 0 && <ImageGrid images={images} />}
                </View>
            </ScrollView>
            {/* filters modal */}
            <FiltersModal modalRef={modalRef}
                filters={filters}
                setFilters={setFilters}
                onClose={closeFiltersModal}
                onApply={applyFilters}
                onReset={resetFilters}
            />
        </View>
    );
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
});

export default HomeScreen;
