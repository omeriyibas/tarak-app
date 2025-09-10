import {Button, ButtonIcon} from "@/src/components/ui/button";

type Props = {
    size?: "sm" | "md" | "lg";
    icon: any;
    isDisabled?: boolean;
    onPress?: ()=>void;
}

const IconButton = ({onPress,icon,size,isDisabled}:Props) => {
    return (
        <Button onPress={onPress} isDisabled={isDisabled} variant={"link"} className={"active:scale-95 duration-0 transition-all"}>
            <ButtonIcon as={icon} size={size} />
        </Button>
    );
};

export default IconButton;
