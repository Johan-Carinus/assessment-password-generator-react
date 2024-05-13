const PRIMARY_CLASS = 'spacer';

export const SPACER_TYPE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

/**
 * A configurable spacer component.
 *
 * @param spacerType The height preset indicated in SPACER_TYPE.
 *
 * @returns {JSX.Element}
 */
export default function Spacer({spacerType}) {
    return (
        <div className={`${PRIMARY_CLASS} ${spacerType}`}/>
    );
}