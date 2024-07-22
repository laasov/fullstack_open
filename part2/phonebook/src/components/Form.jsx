const Form = ({nameVal, phoneVal, nameHandle, phoneHandle, submitHandle}) => {
    return (
      <>
        <form>
          <div>
            name: <input value={nameVal} onChange={nameHandle} />
          </div>
          <div>
            number: <input value={phoneVal} onChange={phoneHandle} />
          </div>
          <div>
            <button onClick={submitHandle} type="submit">add</button>
          </div>
        </form>
      </>
    )
}

export default Form