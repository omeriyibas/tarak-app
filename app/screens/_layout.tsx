
import {Slot} from "expo-router";
import {VStack} from "@/components/ui/vstack";
import {Box} from "@/components/ui/box";

export default function AppLayout() {
    // const tabContext = useContext(TabContext);


    return (
        <VStack className={"h-full justify-between"}>
            {/*<Box className={"mt-[5vh] justify-center px-5 h-14"}>*/}
            {/*    <TopBar/>*/}
            {/*</Box>*/}
            <Box className={"h-full"}>
                <Slot/>
            </Box>
        </VStack>

    );
}
