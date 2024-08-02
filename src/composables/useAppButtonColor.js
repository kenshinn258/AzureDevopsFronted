import { createInjectionState } from '@vueuse/shared'

const [useProvideAppButtonColorStore, useAppButtonColorStore] = createInjectionState(
  ({
    primary: initialPrimary,
    secondary: initialSecondary,
    tertiary: initialTertiary,
    quaternary: initialQuaternary,
  }) => {
    /*
    primary: primaryColor["07"],
  secondary: grayColor["03"],
  tertiary: secondaryColor["02"],
  quaternary: primaryColor["08"],
    */
    const primary = reactive(initialPrimary)
    const secondary = reactive(initialSecondary)
    const tertiary = reactive(initialTertiary)
    const quaternary = reactive(initialQuaternary)
    return { primary, secondary, tertiary, quaternary }
  },
)
export { useProvideAppButtonColorStore, useAppButtonColorStore }
