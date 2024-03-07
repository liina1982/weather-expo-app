import React from 'react'
import HomeBackground from '../components/HomeBackground'
import ForecastModal from '../components/modal.tsx/ForecastModal'
import WeatherInfo from '../components/section/WeatherInfo'
import WeatherTabBar from '../components/tabbar/WeatherTabBar'
import { weather } from '../models/CurrentWeather'
import { ForecastModalProvider } from '../context/ForecastModalContext'

const Home = (): JSX.Element => {
  return (
    <ForecastModalProvider>
        <HomeBackground/>
        <WeatherInfo weather={weather}/>
        <ForecastModal />
        <WeatherTabBar />
   </ForecastModalProvider>
  )
}

export default Home
