import Image from "next/image";

export function GenerateButton() {
    return (
        <div>
            <button className="btn">GENERATE <Image src={'/images/icon-arrow-right.svg'}  alt='Arrow icon' width='12' height='12'/></button>
        </div>
    );
}