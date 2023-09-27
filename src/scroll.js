import React from "react";

const scroll = (props) => {
    return (
        <div style={{
            overflowY: 'scroll', border: '0px solid black', height: '700px'}}>
            {props.children}
        </div>
    )
}

export default scroll;