import React, { useState } from "react";
import { Rnd } from "react-rnd";

const ReBox = () =>{
    const [rnd, setRnd] = useState({width: "100px", height: "100px", x:10, y:10});
    const setPosition = (event, direction) => {
        setRnd (
            prevRnd => ({...prevRnd, x:direction.x, y: direction.y})
        ) 
    }

    const setSize = (event, direction, ref, delta, position) => {
        setRnd (
            prevRnd => ({...prevRnd, 
                width: parseInt(ref.style.width, 10), 
                height: parseInt(ref.style.height, 10), 
                ...position})
        )
    }

    return (
        <Rnd
            style={{backgroundColor: "black"}}
            size={{width:rnd.width, height:rnd.height}}
            position={{x : rnd.x, y: rnd.y}}
            onDragStop={setPosition}
            onResize={setSize}
        >

        </Rnd>
    )
}

export default ReBox;