import {ratePasswordCriteria} from "@/logic/password";

const strengthText = [
    'Too Weak!',
    'Weak',
    'Medium',
    'Strong',
];
const classText = [
    'red-block',
    'orange-block',
    'yellow-block',
    'green-block',
];
const maxRating = strengthText.length - 1;

export function StrengthState({length, uppercase, lowercase, numbers, symbols}) {
    let strengthRating = ratePasswordCriteria(length, lowercase, uppercase, numbers, symbols);
    if (strengthRating > maxRating) {
        strengthRating = maxRating;
    }
    let blockClasses = Array.from({ length: 4 }, () => 'outline-block');
    for (let i = 0; i < strengthRating+1; i++) {
        blockClasses[i] = classText[strengthRating];
    }
    return (
        <div className='strength-state background-dark'>
            <div className='strength'>STRENGTH</div>
            <h2>{strengthText[strengthRating].toUpperCase()}</h2>
            <div className={blockClasses[0]}></div>
            <div className={blockClasses[1]}></div>
            <div className={blockClasses[2]}></div>
            <div className={blockClasses[3]}></div>
        </div>
    );
}