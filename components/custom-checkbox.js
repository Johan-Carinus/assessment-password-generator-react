export function CustomCheckbox({labelText}) {

    return (
        <div className='custom-checkbox'>
            <input type='checkbox'/>
            <label>{labelText}</label>
        </div>
    );
}