import * as filterService  from "../services/filterLogic"

const Country = ({ country }) => {
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
    return (
        filteredCountries.map(country => <Country key={country.name.common} country={country}/>)
    )
}

export default Countries