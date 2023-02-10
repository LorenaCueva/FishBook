function Search({onSearch}){

    function handleSearch(e){
        onSearch(e.target.value);
    }

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
export default Search;