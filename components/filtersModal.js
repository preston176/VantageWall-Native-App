import { View, Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { hp } from '../helpers/common';
import { theme } from '../constants/theme';
import { data } from '../constants/data';
import { capitalize } from 'lodash';
import { SectionView, CommonFilterRow } from './filterViews';

const FiltersModal = ({ modalRef }) => {
    const snapPoints = useMemo(() => ['75%'], []);

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={CustomBackdrop}
            enablePanDownToClose={true}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.filterText}>Filters</Text>
                    {Object.keys(sections).map((sectionName) => {
                        const SectionViewComponent = sections[sectionName];
                        let sectionData = data.filters[sectionName]
                        let title = capitalize(sectionName)
                        return (
                            <View key={sectionName}>
                                <SectionView
                                    title={title}
                                    content={SectionViewComponent({ data: sectionData })}
                                />
                            </View>
                        );
                    })}
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
};

const sections = {
    order: (props) => <CommonFilterRow {...props} />,
    orientation: (props) => <CommonFilterRow {...props} />,
    type: (props) => <CommonFilterRow {...props} />,
    colors: (props) => <CommonFilterRow {...props} />,
};




/**
 * The CustomBackdrop function in JavaScript creates a component with specified styles and an overlay
 * effect based on the animatedIndex prop.
 * @returns A `CustomBackdrop` component is being returned. It takes two props, `animatedIndex` and
 * `style`, and renders a `View` component with the `containerStyle` applied to it. The
 * `containerStyle` is an array that combines `StyleSheet.absoluteFill`, the `style` prop passed to the
 * component, and the `styles.overlay` style.
 */
const CustomBackdrop = ({ animatedIndex, style }) => {
    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
    ];

    return (
        <View style={containerStyle}>
            <BlurView
                style={StyleSheet.absoluteFill}
                tint="dark"
                intensity={25}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        gap: 15,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    filterText: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.8),
        marginBottom: 5,
    },
});

export default FiltersModal;
