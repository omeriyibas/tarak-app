import { Path, Svg } from "react-native-svg";
import { createIcon } from "@gluestack-ui/icon";

const ProfileIcon = createIcon({
    viewBox: "0 0 16 16",
    Root: Svg,
    path: (
        <>
            <Path
                d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
});

ProfileIcon.displayName = 'ProfileIcon';

export default ProfileIcon;
