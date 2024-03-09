const Result = ({country, showInfo}) => {
    return (
        <li><span>{country}</span> <button onClick={showInfo} type="button">show</button></li>
    )
}

export default Result