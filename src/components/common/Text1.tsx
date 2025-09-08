import { Text } from "@/src/components/ui/text";


interface Props {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
    text:string;
    fontFamily?:string;
}

const Text1 = ({size,text,fontFamily="myFont"}:Props) => {
    return (
        <Text style={{fontFamily:fontFamily}} size={size}>{text}</Text>
    );
};


export default Text1;
