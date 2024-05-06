// // @tamagui/core doesn't include `createMedia` so that it can avoid
// // a dependency on react-native. If you are using tamagui, you can
// // import createMedia from there directly and avoid this line:
// import { createMedia } from '@tamagui/react-native-media-driver'
// import { useFonts } from 'expo-font';
// import { createFont, createTamagui, createTokens } from 'tamagui'
// import { tokens } from './tokens';
// import { themes } from './themes';

// // Create a font:

// // To work with the tamagui UI kit styled components (which is optional)
// // you'd want the keys used for `size`, `lineHeight`, `weight` and
// // `letterSpacing` to be consistent. The `createFont` function
// // will fill-in any missing values if `lineHeight`, `weight` or
// // `letterSpacing` are subsets of `size`.

// const interFont = createFont({
//   family: 'Arial, sans-serif',
//   size: {
//     1: 12,
//     2: 14,
//     3: 15,
//     4: 18,
//     5: 20,
//     6: 24,
//   },
//   lineHeight: {
//     // 1 will be 22
//     2: 22,
//   },
//   weight: {
//     1: '300',
//     // 2 will be 300
//     3: '600',
//   },
//   letterSpacing: {
//     1: 0,
//     2: -1,
//     // 3 will be -1
//   },
//   // (native only) swaps out fonts by face/style
//   face: {
//     300: { normal: 'InterLight', italic: 'InterItalic' },
//     600: { normal: 'InterBold' },
//   },
// })

// const config = createTamagui({
//   fonts: {
//     // for tamagui, heading and body are assumed
//     heading: interFont,
//     body: interFont,
//   },
//   tokens,

//   // For more on themes, see the Themes page
//   themes,

//   // For web-only, media queries work out of the box and you can avoid the
//   // `createMedia` call here by passing the media object directly.
//   // If you are going to target React Native, use `createMedia` (it's an identity
//   // function on web so you can import it there without concern).
//   media: createMedia({
//     sm: { maxWidth: 860 },
//     gtSm: { minWidth: 860 + 1 },
//     short: { maxHeight: 820 },
//     hoverNone: { hover: 'none' },
//     pointerCoarse: { pointer: 'coarse' },
//   }),

//   // Shorthands
//   // Adds <View m={10} /> to <View margin={10} />
//   // See Settings section on this page to only allow shorthands
//   // Be sure to have `as const` at the end
//   shorthands: {
//     px: 'paddingHorizontal',
//     f: 'flex',
//     m: 'margin',
//     w: 'width',
//   } as const,

//   // Change the default props for any styled() component with a name.
//   // We are discouraging the use of this and have deprecated it, prefer to use
//   // styled() on any component to change it's styles.
//   defaultProps: {
//     Text: {
//       color: 'green'
//     },
//   },
// })

// type AppConfig = typeof config

// // this will give you types for your components
// // note - if using your own design system, put the package name here instead of tamagui
// declare module 'tamagui' {
//   interface TamaguiCustomConfig extends AppConfig {}

//   // if you want types for group styling props, define them like so:
//   // interface TypeOverride {
//   //   groupNames(): 'a' | 'b' | 'c'
//   // }
// }


// export default config

/* Base config */

import { config } from '@tamagui/config/v3'

import { createTamagui } from 'tamagui' // or '@tamagui/core'
const appConfig = createTamagui(config)
export type AppConfig = typeof appConfig
declare module 'tamagui' {

  // or '@tamagui/core'

  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends AppConfig {
  }

}
export default appConfig
