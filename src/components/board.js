import React from 'react';
import PropTypes from 'prop-types';

function Board(props) {
    const {
        cells,
        onPaint
    } = props;

    function paintCell(i,j) {
        onPaint(i,j);
    }

    function mouseMove(i,j, e) {
        if(e.buttons === 1) { // left-click = 1
            onPaint(i,j);
        } 
    }

    return (
            <div id= "pintable" ref={props.paitingRef}>
                {cells && cells.map((row,i) => (
                    <div className="flex h-12" key={`row${i}`}>
                    {row.map((col,j) => (
                        <div  className="w-12 h-12 border border-black rounded " style={{backgroundColor: col}} key={`cells${j}`}
                            onClick={() => paintCell(i,j)}
                            onMouseMove={(e) => mouseMove(i,j,e)}
                        >
                        </div>
                    ))}
                    </div>
                ))}
            </div>
    )

} 

Board.propTypes = {
    cells: PropTypes.array.isRequired,
    onPaint: PropTypes.func.isRequired
}


export default Board;