type LinkButtonProps = {
    text: string
}

function LinkButton(props: LinkButtonProps) {
  return (
    <div className="LinkButton">
      {/* <Link to={props.link}>
        {props.text}
      </Link> */}
      <h1>{props.text}aaaaa</h1>
    </div>
  );
}

export default LinkButton;
