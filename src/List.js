export default function List(props) {
    return (
        <div class = "OurList">
            <ol id = "ordered">
            {(props.parentList)?.map(element => {
                return (
                <div class = "List">
                    <li key = {element.id}> {element.desc} 
                        <button id = "Delete" onClick = {() => props.removeFunc(element.id)}> 
                            Delete To-Do 
                        </button> 
                    </li> 
                </div>
                );
            })}
            </ol>
    </div>
    )
}
