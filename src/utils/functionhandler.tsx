import { ASSET_TOKEN } from "./display";


export function getNameAddress(longitude: any, latitude: any) {
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=${ASSET_TOKEN}
    `)
        .then(response => response.json())
        .then(data => {
            if (data.features[0]) {
                return data.features[0].place_name
            } else {
                return "Không tìm thấy địa chỉ này";
            }
        })
        .catch(error => console.error(error));
}
