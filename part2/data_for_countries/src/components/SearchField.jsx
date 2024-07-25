const SearchField = ({ handler }) => {
    return (
        <>
          Find countries <input onChange={handler}></input>
        </>
    )
}

export default SearchField