import Image from 'next/image';
import styles from '@/styles/components/text-icon-field.module.scss';

export function TextIconField({text, rightLogo, logoAltText}) {
    return (
        <div className={styles.background}>
            <div className='horizontal-flex'>
                <div className={`heading-large flex-grow ${styles.tempDisabled}`}>{text}</div>
                <div className={`${styles.centered} ${styles.marginLeft}`}>
                    <Image
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