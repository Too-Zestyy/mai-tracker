import { createTokens } from "tamagui";

// Set up our tokens

// The keys can be whatever you want, but we do recommend keeping them
// consistent across the different token categories and intended for
// usage together to make nice designs - eg for a Button to use.

export const tokens = createTokens({
    size: {
        small: 20,
        medium: 30,
        true: 30, // note true = 30 just like medium, your default size token
        large: 40,
    },
    space: {
        small: 10,
        medium: 20,
        true: 20, // same goes for space and other token categories
        large: 30,
    },
    radius: { 0: 0, 1: 3, true: 0 },
    zIndex: { 0: 0, 1: 100, 2: 200, true: 0 },
    color: {
        white: '#fff',
        black: '#000',
        gray: '#888'
    },
})