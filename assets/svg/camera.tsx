import { Path, Svg } from "react-native-svg";
import { createIcon } from "@gluestack-ui/icon";

const CameraIcon = createIcon({
    viewBox: "0 0 32 32",
    Root: Svg,
    path: (
        <Path
            d="M28,4 H25 L24,2 C23.411,0.837 23.104,0 22,0 H10 C8.896,0 8.53,0.954 8,2 L7,4 H4 C1.791,4 0,5.791 0,8 V24 C0,26.209 1.791,28 4,28 H28 C30.209,28 32,26.209 32,24 V8 C32,5.791 30.209,4 28,4 Z M16,24 C11.582,24 8,20.418 8,16 C8,11.582 11.582,8 16,8 C20.418,8 24,11.582 24,16 C24,20.418 20.418,24 16,24 Z M16,10 C12.687,10 10,12.687 10,16 C10,19.313 12.687,22 16,22 C19.313,22 22,19.313 22,16 C22,12.687 19.313,10 16,10 Z"
            fill="#ffffff"
        />
    ),
});

CameraIcon.displayName = "CameraIcon";

export default CameraIcon;
