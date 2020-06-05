import React, {useState, useEffect, useRef} from 'react';

//Subcompoentes
import Board from './board';
import ColorPalette from './colorPalette';
import html2canvas from 'html2canvas';

import PerritoJack from '../assets/PerritoJack.png'

 //Datos de la primera carga de la app
const DAY_ZERO_MATRIX = Array(10).fill(Array(10).fill('#ffffff'));

function MainLayout() {
    //Hooks y estado
    const [colorChosen, setColor] = useState('#000000');
    const [colorGrid, setColorGrid] = useState(
        window.localStorage.getItem('pintable') ? JSON.parse(localStorage.getItem('pintable')) : DAY_ZERO_MATRIX
    );

    //Referencias para la captura de pantalla / Impresión
    let [isPrinting, setIsPrinting] = useState(false);

    const pintable = useRef();
    const capture = useRef();

    //Efecto secundario: Almacenmaiento en local storage
    useEffect(()=>window.localStorage.setItem('pintable',JSON.stringify(colorGrid)))

    //Actualiza el estado, con la modificación de la celda pintada
    function onPaint(row,col){
        const newGrid = [...colorGrid];
        newGrid[row][col] = colorChosen;
        setColorGrid(newGrid);
    }

    //Resetea el tablero a blanco
    function onReset() {
        let newM = [...colorGrid];
        for(let i=0; i<10; i++)
            for(let j=0; j<10; j++)
                newM[i][j]='#ffffff';
        setColorGrid([...newM]);
    }

    //Función para la captura del componente del tablero
    
    function onPrint(){
        // Removes borders to get a clean .png
        setIsPrinting(true);
        

        html2canvas(pintable.current).then(canvas => {      
            capture.current.innerHTML = '';
            capture.current.appendChild(canvas);

            setIsPrinting(false);
        });
    }
    

    return (
        <div className="mainPage">  
            <div className="flex flex-col p-4">
                <div className="flex flex-row w-full mb-4 justify-around">
                    <div className="w-1/4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-1"
                            type="button"
                            onClick={onReset}
                        >
                            New game 
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            type="button"
                            onClick={onPrint}
                        >
                            Print
                        </button>
                    </div>
                    <div className="w-3/4">
                        <ColorPalette
                            mainColour={colorChosen}
                            onChange={setColor} 
                        />
                    </div>
                </div>
                <div className="flex flex-wrap justify-around">
                    <div ref={capture} id="pintable" className="bg-gray-200 border border-black flex flex-col  items-center">
                        <img className="h-64 w-auto" src={PerritoJack} alt="Logo" />
                        <p className ='my-5'>There's no image to print. Draw something</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            type="button"
                            onClick={onPrint}
                        >
                            Print
                        </button>
                    </div>
                    <Board 
                        cells={colorGrid}
                        onPaint={onPaint}
                        paitingRef={pintable}
                        isPrinting={isPrinting}
                    >
                    </Board>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;