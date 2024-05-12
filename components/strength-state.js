import {ratePasswordCriteria} from "@/logic/password";

const strengthText = {
    0: 'Too Weak!',
    1: 'Weak',
    2: 'Medium',
    3: 'Strong',
};

const classText = {
    0:'red-block',
    1:'orange-block',
    2:'yellow-block',
    3:'green-block',
}

export function StrengthState({length, uppercase, lowercase, numbers, symbols}) {
    let strengthRate = ratePasswordCriteria(length, lowercase, uppercase, numbers, symbols);
    let blockClasses = ['outline-block', 'outline-block', 'outline-block', 'outline-block'];
    for (let i = 0; i < strengthRate+1; i++) {
        blockClasses[i] = classText[strengthRate];
    }
    return (
        <div className='strength-state background-dark'>
            <div className='strength'>STRENGTH</div>
            <h2>{strengthText[strengthRate].toUpperCase()}</h2>
            <div className={blockClasses[0]}></div>
            <div className={blockClasses[1]}></div>
            <div className={blockClasses[2]}></div>
            <div className={blockClasses[3]}></div>
        </div>
    );
}