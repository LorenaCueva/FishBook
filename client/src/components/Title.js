import { titleColor, headerTextColor } from "../Colors";

function Title({title}){
    return(
        <div className={`card-panel ${titleColor}`}>
            <h5 className={`${headerTextColor}-text`}>{title}</h5>
      </div>
    );
}
export default Title;