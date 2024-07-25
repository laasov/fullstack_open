const filterCountries = (countries, filter) => {
    return countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
}

export { filterCountries }