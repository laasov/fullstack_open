import Weather from "./Weather"

const Datum = ({name, val}) => {
  return (
    <>
      <p>{name} {val}</p>
    </>
  )
}

const Languages = ({ langs }) => {
  const tmp = langs.map(l => <li key={l}>{l}</li>)
  return (
    <>
      <h3>Languages</h3>
      <ul>
        {tmp}
      </ul>
    </>
  )
}

const Flag = ({url}) => {
  return (
    <>
      <img src={url} alt='flag' />
    </>
  )
}

const CountryData = ({ obj }) => {

  const name = obj.name.common
  const capital = obj.capital
  const area = obj.area
  const languages = Object.values(obj.languages)
  const flagUrl = obj.flags.png
  const lat = obj.capitalInfo.latlng[0]
  const lng = obj.capitalInfo.latlng[1]

    return (
        <>
          <h2>{name}</h2>
          <Datum name="capital" val={capital} />
          <Datum name="area" val={area} />
          <ul>
            <Languages langs={languages} />
          </ul>
          <Flag url={flagUrl} />
          <Weather lat={lat} lon={lng} capital={capital}/>
        </>
    )
}

export default CountryData