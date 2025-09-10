import { Dropdown } from 'react-native-element-dropdown';
import {useState} from "react";

import {StyleSheet} from "react-native";
import {Controller} from "react-hook-form";



type Item = { label: string; value: number };

type Props = {
    placeholder:string;
    values:Item[];
    borderColor:string;
    control: any;
    name:string;
}

const SelectInput = ({control,name,placeholder,values,borderColor}:Props) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <Controller control={control} name={name} render={({field: {onChange, value}}) => (

            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: borderColor }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={values}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholder : '...'}
            searchPlaceholder="Ara..."
            value={value as any}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: Item) => {
                onChange(item.value);
                setIsFocus(false);
            }}
        />
        )}/>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        color: 'gray',
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
});

export default SelectInput;
