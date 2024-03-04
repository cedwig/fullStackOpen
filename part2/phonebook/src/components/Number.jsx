const Number = (props) => {
    return (
      <li>
          {props.name} {props.number} <button onClick={props.deleteBookEntry} type="button">delete</button>
      </li>
    )
}

export default Number