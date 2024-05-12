export function IconButton({buttonText, icon, onClick}) {
    return (
        <div style={{'--icon-path': `url('${icon.path}')`}} className='icon-button'>
            <button className="btn" onClick={onClick}>
                {buttonText.toUpperCase()}
                <div style={{width: icon.width, height: icon.height}} className='icon-box'></div>
            </button>
        </div>
    );
}