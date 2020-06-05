import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

function ColorPalette(props) {
    const{
        mainColour,
        onChange,
    } = props;

    //Estado de la petición
    const [status, setStatus] = useState('idle');

    //Estado de los colores, con colores por default
    const [colours, setColours] = useState(
        window.localStorage.getItem('colours') ? JSON.parse(localStorage.getItem('colours')) :  
        ['black', 'white', 'gray', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']);

    //Efecto secundario: Almacenmaiento en local storage
    useEffect(()=>window.localStorage.setItem('colours',JSON.stringify(colours)));

    const [error, setError] = useState(null);

    //Petición a la Hexbot API
    function getColors() {
        setStatus('loading');
        fetch('https://api.noopschallenge.com/hexbot?count=10').then(
            (response) => {
                if(!response.ok) {
                    throw new Error(`Newtwork response not ok, status code: ${response.status}`)
                }
                return response.json();
            }
        ).then(
            data => {
                setStatus('resolved');
                setColours(data.colors.map(a=>a.value));
            }
        ).catch(
            error => {
                setStatus('rejected');
                setError(error.message);
                console.error('Problem with fetch operation;', error);
                alert(`Error in the request: please try again in a moment`);
            }
        );
    }

    function buttonDisplay() {
        if(status==='loading')
            return (<div className="ml-4 loader ease-linear rounded-full border-4 border-t-2 border-gray-200 h-16 w-16"></div>)
        else if(status==='idle')
            return (
            <div className="ml-4 border-gray-200 h-16 w-16">
                <img src="https://img.icons8.com/fluent/96/000000/paint-palette.png"/>
            </div>)
        else if(status==='resolved')
            return (<div className=" ml-4 border-gray-200 h-16 w-16">
                        <svg height="100%" viewBox="0 -1 513.22 513" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="m240.015625 495.46875c-.015625-8.207031 6.175781-15.277344 14.367187-15.886719 100.882813-7.472656 180.6875-92 180.6875-194.734375l32-.882812v.882812c0 119.261719-92.429687 217.421875-209.40625 226.574219-9.457031.734375-17.632812-6.480469-17.648437-15.953125zm0 0" fill="#fbc02d"/><path d="m113.871094 456.878906c-70.222656-40.511718-113.871094-116-113.871094-196.992187 0-34.207031 7.710938-67.953125 22.414062-98.527344 3.875-8.050781 13.601563-11.3125 21.347657-6.867187l1.535156.882812c7.039063 4.046875 9.328125 12.800781 5.824219 20.109375-12.546875 26.210937-19.121094 55.105469-19.121094 84.402344 0 69.597656 37.503906 134.449219 97.855469 169.261719zm0 0" fill="#4dd0e1"/><path d="m437.441406 137.886719c-7.089844 4.144531-16.304687 2.320312-20.960937-4.449219-36.242188-52.65625-96.703125-84.832031-161.054688-84.832031-34.515625 0-68.433593 9.121093-98.097656 26.382812l-16.097656-27.644531c34.546875-20.113281 74.015625-30.738281 114.195312-30.738281 74.621094 0 144.734375 37.152343 186.957031 98.015625 5.394532 7.792968 3.234376 18.496094-4.941406 23.265625zm0 0" fill="#e64a19"/><path d="m204.160156 96.109375h-80v-80c0-8.832031 7.167969-16 16-16 8.832032 0 16 7.167969 16 16v48h48c8.832032 0 16 7.167969 16 16s-7.167968 16-16 16zm0 0" fill="#ff7043"/><path d="m136 464.109375h-80c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h48v-48c0-8.832031 7.167969-16 16-16s16 7.167969 16 16zm0 0" fill="#80deea"/><path d="m485.902344 321.34375-33.949219-33.9375-33.953125 33.9375c-6.238281 6.238281-16.382812 6.238281-22.625 0-6.253906-6.257812-6.238281-16.386719 0-22.625l56.578125-56.5625 56.574219 56.5625c6.257812 6.238281 6.257812 16.382812 0 22.625-6.238282 6.253906-16.367188 6.253906-22.625 0zm0 0" fill="#fdd835"/></svg>
                    </div>)
    }

    return (
        <div className="h-full">
            <div className="flex items-center flex-wrap lg:flex-no-wrap">
                <div className="flex flex-col justify-between items-center py-4 mx-4 md:w-1/4 w-full">
                    <p>Choose your colors to begin with:</p>
                    <button className="mt-4 flex items-center shadow bg-gray-800 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded"
                    onClick={getColors}
                    >
                        Request a random palette!
                        {buttonDisplay()}
                    </button>
                </div>
                <div className="w-full md:w-3/4">
                    <ul className="hex-grid__list palette">
                        {colours.map(colour => {
                            const isSelected = colour === mainColour;
                            return (
                                <li 
                                    key={colour}
                                    className="hex-grid__item"

                                >
                                    <div 
                                        style={{backgroundColor: colour}}
                                        className={`hex-grid__content shadow ${isSelected ? 'color-selected' : ''}`}
                                        onClick={() => onChange(colour)}
                                    ></div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
ColorPalette.propTypes = {
    mainColour: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default ColorPalette;