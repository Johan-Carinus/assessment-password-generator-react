const PRIMARY_CLASS = 'spacer';

export const SPACER_TYPE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

/**
 * A configurable spacer component.
 *
 * @param primarySpacerType The height preset indicated in SPACER_TYPE.
 * @param mobileSpacerType The height preset indicated in SPACER_TYPE for mobile screen sizes.
 *
 * @returns {JSX.Element}
 */
export default function Spacer({primarySpacerType, mobileSpacerType}) {
    let mSpacer = mobileSpacerType ? mobileSpacerType : primarySpacerType;

    return (
        <>
            <div className={`${PRIMARY_CLASS} ${primarySpacerType}`}/>
            <div className={`${PRIMARY_CLASS} mobile ${mSpacer}`}/>
        </>
    );
}