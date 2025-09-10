import {Modal, ModalBackdrop, ModalContent} from "@/src/components/ui/modal";
import {Image} from "expo-image";
import React, {useState} from "react";
import {Box} from "@/src/components/ui/box";

type Props = {
    imgeUrl:string;
    isOpen:boolean;
    setIsOpen:(val)=>void;
}

const ImageModal = ({imgeUrl,isOpen,setIsOpen}:Props) => {
    return (
        <Modal onClose={()=>setIsOpen(false)}  isOpen={isOpen}>
            <ModalBackdrop/>
            {/*<ModalContent className={"bg-primary-400 border-none"}>*/}
                <Image
                    // source={{uri: item.url_path}}               // boyutlandırılmış URL
                    source={{uri: imgeUrl}}               // boyutlandırılmış URL
                    // className={"h-24 w-24 rounded-full"}
                    // className="w-full h-full rounded-2xl"
                    style={{width: "80%", height: "50%", borderRadius: 5}}
                    // placeholder={blurhash}                  // veya placeholder={{uri: tinyThumb}}
                    transition={200}                        // fade-in
                    // cachePolicy="disk"                      // memory|disk|memory-disk
                    contentFit="fill"
                />
            {/*</ModalContent>*/}
        </Modal>
    );
};

export default ImageModal;
