// import { tokens } from "./tokens";

// export const themes = {
//     light: {
//       bg: '#cccccc',
//       color: tokens.color.gray,
//       borderColor: "#ee11bb",
//     },
//     dark: {
//       bg: '#111',
//       color: tokens.color.gray,
//     },
// }

import { createSoftenMask, createThemeBuilder } from '@tamagui/theme-builder'

const themesBuilder = createThemeBuilder()
  .addPalettes({
    dark: ['#000', '#111', '#222', '#999', '#ccc', '#eee', '#fff'],
    light: ['#fff', '#eee', '#ccc', '#999', '#222', '#111', '#000'],
  })
  .addTemplates({
    base: {
      background: 0,
      color: -0,
    },
  })
  .addMasks({
    soften: createSoftenMask(),
  })
  .addThemes({
    light: {
      template: 'base',
      palette: 'light',
    },
    dark: {
      template: 'base',
      palette: 'dark',
    },
  })
  .addChildThemes({
    subtle: {
      mask: 'soften',
    },
  })

export const themes = themesBuilder.build()