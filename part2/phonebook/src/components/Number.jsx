const Number = (props) => {
    return (
      <li className="number">
          {props.name} {props.number} <button onClick={props.deleteBookEntry} type="button">delete</button>
      </li>
    )
}

export default Number