import { StyleSheet, Text, View } from "react-native"
import { hp } from "../helpers/common"
import { theme } from "../constants/theme"

const SectionView = ({ title, content }) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View>
                {content}
            </View>
        </View>
    )
}
const CommonFilterRow = () => {
    return (
        <View>
            <Text>Order View</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        gap: 8
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.neutral(0.8)
    }
})

export { SectionView, CommonFilterRow };
