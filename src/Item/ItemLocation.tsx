import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { WINDOW_WIDTH } from '../utils'
import { Colors } from '../constants'
import Icon, { Icons } from '../components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { setLocationSelect } from '../redux/addressSlice'

interface itemProps {
    item: any,
    enable?: boolean
}
const ItemLocation: FC<itemProps> = ({ item, enable = false }) => {
    const select = useSelector((state: RootState) => state.addressSlice.locationSelect);
    const isSelect = select._id === item._id;
    const dispatch = useDispatch<AppDispatch>()
    const color = isSelect ? Colors.BACKGROUND_COLOR : Colors.WHITE_COLOR;
    const textColor = isSelect ? Colors.WHITE_COLOR : Colors.BACKGROUND_COLOR;
    const handlerSelect = () => {
        dispatch(setLocationSelect(item))
    }
    return (
        <TouchableOpacity onPress={enable ? handlerSelect : undefined} activeOpacity={0.8}>
            <View style={[styles.container, { backgroundColor: enable ? color : Colors.WHITE_COLOR }]}>
                <Icon type={Icons.Ionicons} name='location' color={Colors.BACKGROUND_COLOR} size={26} />
                <View>
                    <Text style={{ fontWeight: 'bold', color: enable ? textColor : undefined }}>
                        {`${item.id_user.firstname} ${item.id_user.lastname}`}
                    </Text>
                    <Text style={{ color: enable ? textColor : undefined }}>
                        {item.id_user.phone}
                    </Text>
                    <Text style={{ color: enable ? textColor : undefined }}>
                        {item.details}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemLocation

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH - 20,
        padding: 5,
        flexDirection: 'row',
        borderRadius: 16,
        alignSelf: 'center'
    }
})