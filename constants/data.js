const categories = [
    "backgrounds",
    "tech",
    "people",
    "animals",
]

const filters = {
    order_by: ["latest", "relevant"],
    orientation: ["landscape", "portrait", "squarish"],
    asset_type: ["photo", "illustration", "vector"],
    color: ["black_and_white", "black", "white", "yellow", "orange", "red", "magenta", "green", "teal", "blue"],
    content_filter: ["low", "high"]
}

export const data = {
    categories, filters
}