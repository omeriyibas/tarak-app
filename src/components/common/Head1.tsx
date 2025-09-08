import {Heading} from "@/src/components/ui/heading";

interface Props {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
    text:string;
    fontFamily?:string;
}

const Head1 = ({size,text,fontFamily="myFont"}:Props) => {
    return (
        <Heading style={{fontFamily:fontFamily}} size={size}>{text}</Heading>
    );
};

export default Head1;
