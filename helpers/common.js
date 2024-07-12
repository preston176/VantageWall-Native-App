import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

/**
 * The function `wp` calculates the width in pixels based on a percentage of the device width.
 * @returns The function `wp` is returning the value of a percentage of the device width.
 */
export const wp = percentage => {
    const width = deviceWidth;
    return (percentage * width) / 100;
}

/**
 * The function `hp` calculates the height in pixels based on a percentage of the device height.
 * @returns The function `hp` is returning a calculated value based on the input percentage and the
 * device height. It calculates the height value by multiplying the percentage with the device height
 * and then dividing by 100.
 */
export const hp = percentage => {
    const height = deviceHeight;
    return (percentage * height) / 100;
}