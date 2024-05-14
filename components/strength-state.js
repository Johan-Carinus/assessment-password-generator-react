import {ratePasswordCriteria} from '@/logic/password-engine';

const PRIMARY_CLASS = 'strength-state';
const STRENGTH_TEXT = [
    'Too Weak!',
    'Weak',
    'Medium',
    'Strong',
];
const BLOCK_INDICATOR_CLASS = [
    'red-block',
    'orange-block',
    'yellow-block',
    'green-block',
];
const MAX_DISPLAYABLE_STRENGTH = STRENGTH_TEXT.length - 1;

/**
 * Component that is used to visually indicate the strength of a potential password in discrete levels based on certain
 * input criteria.
 *
 * @param length The required length of the password.
 * @param {CharacterOptions} characterOptions Data indicating which characters a password should contain.
 *
 * @returns {JSX.Element}
 */
export default function StrengthState({length, characterOptions}) {
    let strengthRating = ratePasswordCriteria(length, characterOptions);
    if (strengthRating > MAX_DISPLAYABLE_STRENGTH) {
        strengthRating = MAX_DISPLAYABLE_STRENGTH;
    }

    let blocks = new Array(4).fill(0)
        .map((className, index) => {
            return index <= strengthRating ? BLOCK_INDICATOR_CLASS[strengthRating] : 'outline-block';
        })
        .map((className, index) => (
            <div key={index} className={className}/>
        ));

    return (
        <div className={`${PRIMARY_CLASS} background-dark`}>
            <div className='strength'>STRENGTH</div>
            <h2>{STRENGTH_TEXT[strengthRating].toUpperCase()}</h2>
            {blocks}
        </div>
    );
}