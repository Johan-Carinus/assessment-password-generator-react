export function Slider() {
    return (
        <div>
            <div className='row-flex'>
                <p className='flex-grow-1'>Character Length</p>
                <h1 className='text-green'>10</h1>
            </div>
            <div className="slidecontainer">
                <input type="range" min="0" max="100" value="50" className="slider" id="myRange"/>
            </div>
        </div>
    );
}

//https://www.w3schools.com/howto/howto_js_rangeslider.asp