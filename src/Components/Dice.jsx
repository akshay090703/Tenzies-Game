export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div onClick={props.holdDice} className="dice-component" style={styles}>
      <h2>{props.value}</h2>
    </div>
  );
}
