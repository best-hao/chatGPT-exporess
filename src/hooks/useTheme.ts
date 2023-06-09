import type { GlobalThemeOverrides } from 'naive-ui'
import { computed, watch } from 'vue'
import { darkTheme, useOsTheme } from 'naive-ui'
import { useAppStore } from '@/store'

export function useTheme() {
  const appStore = useAppStore()

  const OsTheme = useOsTheme()

  const isDark = computed(() => {
    if (appStore.theme === 'auto')
      return OsTheme.value === 'dark'
    else
      return appStore.theme === 'dark'
  })

  const theme = computed(() => {
    return isDark.value ? darkTheme : undefined
  })

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    if (isDark.value) {
      return {
        common: {
          primaryColor: '#f0a020',
          primaryColorHover: '#fcb040',
          primaryColorPressed: '#c97c10',
          primaryColorSuppl: '#fcb040',
          successColor: '#f0a020',
          successColorHover: '#fcb040',
          successColorPressed: '#c97c10',
          successColorSuppl: '#fcb040',
        },
      }
    }
    return {
      common: {
        primaryColor: '#2080f0',
        primaryColorHover: '#4098fc',
        primaryColorPressed: '#1060c9',
        primaryColorSuppl: '#4098fc',
        successColor: '#2080f0',
        successColorHover: '#4098fc',
        successColorPressed: '#1060c9',
        successColorSuppl: '#4098fc',
      },
    }
  })

  watch(
    () => isDark.value,
    (dark) => {
      if (dark)
        document.documentElement.classList.add('dark')
      else
        document.documentElement.classList.remove('dark')
    },
    { immediate: true },
  )

  return { theme, themeOverrides }
}
