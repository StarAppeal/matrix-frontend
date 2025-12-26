import { Image, type ImageSource } from "expo-image";

type Props = {
    imgSource: ImageSource;
    className?: string;
};

export default function ImageViewer({ imgSource, className }: Props) {
    return (
        <Image
            source={imgSource}
            className={`w-80 h-[440px] rounded-2xl ${className || ''}`}
        />
    );
}

