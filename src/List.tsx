import React from 'react';

export default function List(props: { parentList: { id: number; desc: string; }[]; removeFunc: (id: number) => void; }) {
    return (
        <div className="OurList">
            <ol id="ordered">
                {(props.parentList)?.map(element => {
                    return (
                        <div className= "List" key={element.id}>
                            <li>
                                {element.desc}
                                <button id= "Delete" onClick={() => props.removeFunc(element.id)}>
                                    Delete To-Do
                                </button>
                            </li>
                        </div>
                    );
                })}
            </ol>
        </div>
    );
}
