import * as filterService  from "../services/filterLogic"
import CountryData from "./CountryData"

const CountryName = ({ country }) => {
    return (
        <>
          <p>{country.name.common}</p>
        </>
    )
}

const Countries = ({ countries, filter }) => {

    const filteredCountries = filterService.filterCountries(countries, filter)

    if (filteredCountries.length > 10) {
        return (
            <>
              <p>Too many countries, specify another filter</p>
            </>
        )
    }

    if (filteredCountries.length === 1) {
        const countryObj = filteredCountries[0]
        console.log(countryObj)
        return (
            <>
              <CountryData obj={countryObj}/>
            </>
        )
    }

    return (
        filteredCountries.map(country => <CountryName key={country.name.common} country={country}/>)
    )
}

export default Countries