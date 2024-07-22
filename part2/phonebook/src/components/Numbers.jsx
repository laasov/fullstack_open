const Number = ({ number }) => {
    return (
      <>
        <p>{number.name} {number.number}</p>
      </>
    )
  }
  
const Numbers = ({ numbers }) => numbers.map(number => <Number key={number.id} number={number} />)

export default Numbers