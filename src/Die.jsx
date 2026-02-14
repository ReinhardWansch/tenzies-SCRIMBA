export default function Die(props) {
    return (
        <button
            onClick={props.handleClick}
            className= {props.dieSetup.onHold ? "onHold" : ""}
        >
            {props.dieSetup.currentValue}
        </button>
    )
}