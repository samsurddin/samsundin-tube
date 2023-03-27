import classes from '../styles/Textinput.module.css'
function Textinput({icon,...rest}) {
  return (
    <div>
      <div className={classes.textInput}>
              <input {...rest} />
              <span className="material-icons-outlined"> {icon} </span>
            </div>
    </div>
  );
}

export default Textinput;
