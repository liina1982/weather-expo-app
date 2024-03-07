import React, { type ReactNode, createContext, useContext } from 'react'
import { useSharedValue, type SharedValue } from 'react-native-reanimated'

interface PorecastModalProviderProps {
  children: ReactNode
}

export const ForecastModalContext = createContext <SharedValue<number> | null>(null)

export const ForecastModalProvider = ({ children }: PorecastModalProviderProps): JSX.Element => {
  const animatedPosition = useSharedValue(0)
  return (
        <ForecastModalContext.Provider value={animatedPosition}>
            {children}
        </ForecastModalContext.Provider>
  )
}

export const useForecastModalPosition = (): SharedValue<number> => {
  const context = useContext(ForecastModalContext)
  if (context === null) {
    throw new Error('useForecastModalPosition must be used within a Forecast Modal Provider')
  }
  return context
}
