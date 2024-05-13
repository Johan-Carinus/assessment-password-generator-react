import {ratePasswordCriteria} from "@/logic/password-engine";

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
 * @param uppercase Should the password contain uppercase characters.
 * @param lowercase Should the password contain lowercase characters.
 * @param numbers Should the password contain number characters.
 * @param symbols Should the password contain special symbol characters.
 *
 * @returns {JSX.Element}
 */
export default function StrengthState({length, uppercase, lowercase, numbers, symbols}) {
    let strengthRating = ratePasswordCriteria(length, lowercase, uppercase, numbers, symbols);
    if (strengthRating > MAX_DISPLAYABLE_STRENGTH) {
        strengthRating = MAX_DISPLAYABLE_STRENGTH;
    }

    let blocks = new Array(4).fill(0)
        .map((className, index) => {
            if (index <= strengthRating) {
                return BLOCK_INDICATOR_CLASS[strengthRating];
            } else {
                return 'outline-block'
            }
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