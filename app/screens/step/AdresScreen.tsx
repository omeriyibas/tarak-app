import useProgress from "@/src/hooks/useProgress";
import {FlowType} from "@/src/constants/progress";
import {Box} from "@/src/components/ui/box";
import Button1 from "@/src/components/common/Button1";
import React, {useEffect} from "react";
import SelectInput from "@/src/components/common/SelectInput";
import FormInput from "@/src/components/common/FormInput";
import {SubmitHandler, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {VStack} from "@/src/components/ui/vstack";
import useAddressOptions from "@/src/hooks/useAddressOptions";
import {createStoreAddress} from "@/src/services/store-address";
import FormTextArea1 from "@/src/components/common/FormTextArea";


const schema = z.object({
    detail: z.string().min(1, "Adres detayı boş bırakılamaz"),
    city_id: z.number().int().positive(),
    district_id: z.coerce.number().int().positive(),
});
type FormValues = z.infer<typeof schema>;


const AdresScreen = () => {
    const {control, handleSubmit, setValue} = useForm<FormValues>({
        resolver: zodResolver(schema) as any,
        defaultValues: { detail: "", city_id: 0, district_id: 0 },
    });

    const {goNext} = useProgress({flow: FlowType.Details});

    const { cityOptions, districtOptions } = useAddressOptions<FormValues>({ control });

    const selectedCityId = useWatch({ control, name: "city_id" });

    useEffect(() => {
        setValue("district_id", 0 as any);
    }, [selectedCityId]);

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            await createStoreAddress({
                city_id: values.city_id,
                district_id: values.district_id,
                detail: values.detail,
            });
            await goNext();
        } catch (e) {
            console.log("Address create error", e);
        }
    };

    return (
        <>
            <VStack className={"justify-between flex-1"}>
                <VStack className={"gap-5"} >
                    <SelectInput control={control} name={"city_id"} placeholder={"Şehir seçiniz"} values={cityOptions} borderColor={"#2563eb"}/>
                    <SelectInput control={control} name={"district_id"} placeholder={"İlçe seçiniz"} values={districtOptions} borderColor={"#2563eb"}/>
                    <FormTextArea1 name={"detail"} size={"lg"} placeholder={"Açık adres"} control={control} icon={null}/>

                </VStack>
                <Box className={"px-2"}>
                    <Button1 onPress={handleSubmit(onSubmit)} text={"Next"}/>
                </Box>
            </VStack>
        </>
    );
};

export default AdresScreen;
