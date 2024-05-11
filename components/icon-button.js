import Image from "next/image";

export function IconButton({buttonText, icon}) {
    return (
        <div style={{'--icon-path': `url('${icon.path}')`}} className='icon-button'>
            <button className="btn">
                {buttonText.toUpperCase()}
                <div style={{width: icon.width, height: icon.height}} className='icon-box'></div>
            </button>
        </div>
    );
}