const DeleteButton = ({text, handler}) => {
  return (
    <>
      <button onClick={handler}>{text}</button>
    </>
  )
}

const Number = ({ number, handler }) => {
    return (
      <>
        <div>
          {number.name} {number.number}
          <button onClick={() => handler(number.id)}>delete</button>
        </div>
      </>
    )
  }
  
const Numbers = ({ numbers, handler }) => numbers.map(number => <Number key={number.id}
                                                                        number={number}
                                                                        handler={handler} />)

export default Numbers