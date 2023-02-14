function Search({onSearch, onSort=null}){

    function handleSearch(e){
        onSearch(e.target.value);
    }
    function handleSort(e){
        onSort(e.target.value);
    }

    if(onSort){
        return(
            <div className="row">
                <ul className={"collection col s6 offset-s3"}>
                    <li className="collection-item">
                        <form onSubmit={e => e.preventDefault()}>
                            <input id="search" type="text" name="search" onChange={handleSearch}/>
                            <span className="form-helper">Search by Fish Name</span>
                        </form>
                    </li>
                    <li className="collection-item">
                        <form onSubmit={e => e.preventDefault()}>
                        <label>
                        <input name="water_type" type="radio" value="Freshwater" onChange={handleSort}/>
                                <span className="form-helper">Freshwater</span>
                            </label>
                            <label>
                                <input name="water_type" type="radio" value="Saltwater" onChange={handleSort} />
                                <span>Saltwater</span>
                            </label>
                            <div>
                                <span className="form-helper">Sort by Water Type</span>
                            </div>
                        </form>
                    </li>                           
                </ul>
            </div>
        )
    }

    else{
        return(
            <div className="row">
                <ul className={"collection col s6 offset-s3"}>
                    <li className="collection-item">
                        <form onSubmit={e => e.preventDefault()}>
                            <input id="search" type="text" name="search" onChange={handleSearch}/>
                            <span className="form-helper">Search by Fish Name</span>
                        </form>
                    </li>
                </ul>
            </div>
        )
    }

}
export default Search;