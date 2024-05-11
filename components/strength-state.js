export function StrengthState({strengthState}) {
    return (
        <div className='strength-state background-dark'>
            <div className='strength'>STRENGTH</div>
            <h2>{strengthState.toUpperCase()}</h2>
            <div className='red-block'></div>
            <div className='orange-block'></div>
            <div className='yellow-block'></div>
            <div className='outline-block'></div>
        </div>
    );
}