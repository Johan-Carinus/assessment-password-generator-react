import { TextIconField } from '@/components/text-icon-field';

export default function Home() {
    return (
        <div className='horizontal-flex'>
            <div className='flex-grow'></div>
            <div className='flex-grow'><TextIconField text='PTx1f5DaFX' rightLogo={'/images/icon-copy.svg'} logoAltText='Copy Password'/></div>
            <div className='flex-grow'></div>
        </div>
    );
}
