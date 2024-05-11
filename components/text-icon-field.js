import Image from 'next/image';

export function TextIconField({text, rightLogo, logoAltText}) {
    return (
        <div className='background standard-padding'>
            <div className='row-flex'>
                <div className='flex-grow-1'>
                    <h1 className='text-disabled'>{text}</h1>
                </div>
                <div className='flex-centered'>
                    <Image
                        className='margin-left'
                        src={rightLogo}
                        alt={logoAltText}
                        width={21}
                        height={24}
                    />
                </div>
            </div>
        </div>
    );
}