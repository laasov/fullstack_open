const Filter = ({ filter, handler }) => {
    return (
      <>
        filter shown names with<input value={filter} onChange={handler}/>
      </>
    )
}

export default Filter