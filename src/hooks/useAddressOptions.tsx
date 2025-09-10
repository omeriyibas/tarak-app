import {useEffect, useMemo, useState} from "react";
import {Control, useWatch} from "react-hook-form";
import {getCityOptions} from "@/src/services/city";
import {getDistrictOptions} from "@/src/services/district";

export type SelectOption = { label: string; value: number };

type UseAddressOptionsArgs<TFieldValues> = {
    control: Control<TFieldValues>;
    cityFieldName?: keyof TFieldValues | "city_id";
};

export default function useAddressOptions<TFieldValues>({
    control,
    cityFieldName = "city_id",
}: UseAddressOptionsArgs<TFieldValues>) {
    const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);
    const [districtOptions, setDistrictOptions] = useState<SelectOption[]>([]);
    const [loadingCities, setLoadingCities] = useState<boolean>(false);
    const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);

    const selectedCityId = useWatch({
        control,
        name: cityFieldName as any,
    }) as unknown as number;

    const fetchCities = async () => {
        setLoadingCities(true);
        try {
            const opts = await getCityOptions();
            setCityOptions(opts);
        } finally {
            setLoadingCities(false);
        }
    };

    const fetchDistricts = async (cityId: number) => {
        setLoadingDistricts(true);
        try {
            const opts = await getDistrictOptions(cityId);
            setDistrictOptions(opts);
        } finally {
            setLoadingDistricts(false);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
        if (!selectedCityId || selectedCityId <= 0) {
            setDistrictOptions([]);
            return;
        }
        fetchDistricts(selectedCityId);
    }, [selectedCityId]);

    return useMemo(() => ({
        cityOptions,
        districtOptions,
        loadingCities,
        loadingDistricts,
        refreshCities: fetchCities,
        refreshDistricts: () =>
            selectedCityId && selectedCityId > 0 ? fetchDistricts(selectedCityId) : Promise.resolve(),
    }), [cityOptions, districtOptions, loadingCities, loadingDistricts, selectedCityId]);
}


