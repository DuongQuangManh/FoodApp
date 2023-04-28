import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import MapLibreGL from '@maplibre/maplibre-react-native';
import { Header, Icon, Input, Toast } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ASSET_TOKEN, WINDOW_WIDTH } from '../utils';
import { Icons } from '../components/Icon';
import { addAddress, setError } from '../redux/addressSlice';

const AddressScreen = () => {
    MapLibreGL.setAccessToken(ASSET_TOKEN);

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<AppDispatch>();

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState("");
    const [details, setDetails] = useState("");
    const [toast, setToast] = useState("");

    const user = useSelector((state: RootState) => state.userSlice.data)
    const error = useSelector((state: RootState) => state.addressSlice.error)
    // set map hiển thị vị trí hiện tại
    // const DEFAULT_CENTER = useSelector((state: RootState) => state.addressSlice.myLocation)

    const handleMapPress = (event: any) => {
        const { lngLat } = event;
        setSelectedLocation(lngLat);
        console.log(event.geometry.coordinates)
        setLongitude(event.geometry.coordinates[0])
        setLatitude(event.geometry.coordinates[1])
        getAddress();
    };


    const getAddress = async () => {
        await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=${ASSET_TOKEN}
        `)
            .then(response => response.json())
            .then(data => {
                if (data.features[0]) {
                    setAddress(data.features[0].place_name)
                } else { setAddress("Không tìm thấy địa chỉ này") }
            })
            .catch(error => console.error(error));
    }

    const handlerBack = () => {
        navigation.goBack();
        dispatch(setError(""))
    }
    const handlerSave = () => {
        setToast("");

        if (check() == true) {
            let obj = {
                details: `${details},${address}`,
                longitude: longitude,
                latitude: latitude,
                id_user: user._id,
            }
            dispatch(addAddress({ obj, user }))
        }
    }

    const check = () => {
        if (!latitude || !longitude || !address || !details) {
            setToast("Vui lòng nhập địa chỉ cụ thể hoặc chọn địa điểm trên bản đồ")
            console.log("false")
            return false;
        } else {
            console.log("true")

            return true;

        }
    }
    const icon = <Icon type={Icons.Ionicons} name='add' size={25} color='black' />
    return (
        <View style={{ flex: 1, padding: 5, }}>
            <Header label='Add address' onBack={handlerBack} icon={icon} onSub={handlerSave} />

            <View>
                <Input extraProps={{
                    placeholder: "Số nhà/ngõ/ngách...",
                    onChangeText: setDetails
                }}
                />
                <Text>{`Địa chỉ: ${details},${address}`}</Text>

            </View>

            <View style={styles.box3}>
                <Text>Chọn địa chỉ của bạn: {`${address}`}</Text>
                <MapLibreGL.MapView
                    style={styles.map}
                    logoEnabled={false}
                    styleURL="mapbox://styles/duongquangmanh/clgncd75y00db01pjd3oz8kgl"
                    onPress={handleMapPress}

                >
                    <MapLibreGL.Camera
                        zoomLevel={9}
                        centerCoordinate={[105.5375720567854, 21.108585113017043]}
                    />

                    {selectedLocation && (
                        <MapLibreGL.PointAnnotation
                            id="selectedLocation"
                            coordinate={selectedLocation}
                            onSelected={() => console.log('onSelected')}
                            onDeselected={() => console.log('onDeselected')}
                        />
                    )}
                </MapLibreGL.MapView>
            </View>
            {toast !== "" && <Toast message={toast} />}
            {error && <Toast message={error} />}
        </View>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: 400,
        borderRadius: 16,
        marginTop: 10,
    },
    box3: {
        width: WINDOW_WIDTH - 10,
        height: 470,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        marginTop: 20,

    }
})