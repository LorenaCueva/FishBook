function AquariumCardRow({card1 = null, card2 = null}){
return(
    <div className="row">
        <div className="col s6">{card1}</div>
        <div className="col s6">{card2}</div>
    </div>
)
}
export default AquariumCardRow;