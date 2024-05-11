import { TextIconField } from '@/components/text-icon-field';

export default function Home() {
    return (
        <div className='flex-centered'>
            <div className='central-column'>
                <TextIconField text='PTx1f5DaFX' rightLogo={'/images/icon-copy.svg'} logoAltText='Copy Password'/>
            </div>
        </div>
    );
}
