function FishCardRow({card1 = null, card2 = null, card3 = null}){
    return(
    <div className="row">
        <div className="col s4">{card1}</div>
        <div className="col s4">{card2}</div>
        <div className="col s4">{card3}</div>
    </div>

    );
}
export default FishCardRow;