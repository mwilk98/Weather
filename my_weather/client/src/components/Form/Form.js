import React from "react";


const Form = props => 
{
    return(
        <form onSubmit={props.submit}>
            <input
                type="text"
                value={props.value}
                placeholder="Miasto"
                onChange={props.handler}
            />
            <button> Wyszukaj </button>
        </form>
    )
}

export default Form;