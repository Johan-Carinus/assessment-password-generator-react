import { TextIconField } from '@/components/text-icon-field';
import { TopTitle } from "@/components/top-title";
import { Options } from "@/components/options";

export default function Home() {
    return (
        <div className='flex-centered'>
            <div className='central-column'>
                <TopTitle text='Password Generator' />
                <TextIconField text='PTx1f5DaFX' rightLogo={'/images/icon-copy.svg'} logoAltText='Copy Password' />
                <Options />
            </div>
        </div>
    );
}
