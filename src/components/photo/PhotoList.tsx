import React from "react";
import {FlatList, Pressable} from "react-native";
import {Image} from "expo-image";

type PhotoItem = { url_path: string } & Record<string, any>;

type PhotoListProps = {
    photos: PhotoItem[];
    onSelect: (item: PhotoItem) => void;
};

export const PhotoList: React.FC<PhotoListProps> = ({photos, onSelect}) => {
    return (
        <FlatList showsVerticalScrollIndicator={false} numColumns={2}
                  columnWrapperClassName={"gap-3 items-center"} contentContainerClassName={"gap-3"}
                  data={photos} renderItem={({item}) => (
            <Pressable onPress={() => onSelect(item)}
                       className={"w-44 h-44 shadow-xl shadow-background-dark "}>
                <Image
                    source={{uri: item.url_path}}
                    style={{width: "100%", height: "100%", borderRadius: 5}}
                    transition={200}
                    contentFit="fill"
                />
            </Pressable>
        )}/>
    );
};

export default PhotoList;


