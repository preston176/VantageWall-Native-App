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


/**
 * The function `getColumnCount` returns the number of columns based on the device width.
 * @returns The function `getColumnCount` returns the number of columns based on the device width. If
 * the device width is greater than or equal to 1024, it returns 4 (for desktop). If the device width
 * is between 768 and 1023, it returns 3 (for tablet screen). Otherwise, if the device width is less
 * than 768, it returns 2 (for phone
 */
export const getColumnCount = () => {
    if (deviceWidth >= 1024) {
        // desktop
        return 4;
    } else if (deviceWidth >= 768) {
        // tablet screen
        return 3;
    } else {
        // phone
        return 2
    }
}

export const getImageSize = (height, width) => {
    if (width > height) {
        // this is landscape image
        return 250;
    }
    else if (width < height) {
        {
            // this is portrait image
            return 300
        }
    }
    else {
        return 200;
    }
}