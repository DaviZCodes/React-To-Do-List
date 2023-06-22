import React from 'react';

export default function List(props: { parentList: { id: number; desc: string; }[]; removeFunc: (id: number) => void; }) {
    return (
        <div className="OurList">
            <ol id="ordered" className="custom-ordered-list">
                {(props.parentList)?.map(element => {
                    return (
                        <div className= "List" key={element.id}>
                            <li>
                                <div className = "desc">
                                {element.desc}
                                </div>
                                <button id= "Delete" onClick={() => props.removeFunc(element.id)}>
                                    Delete To-Do
                                </button>
                                {/*<button id= "Edit" onClick={() => {}}>Edit</button>*/}
                            </li>
                        </div>
                    );
                })}
            </ol>
        </div>
    );
}
