import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { ItemHistory, ItemStatus } from '../Item'
import { Colors, Status } from '../constants'
import { WINDOW_WIDTH } from '../utils'
import { NotYet } from '../components'
import { Icons } from '../components/Icon'

const HistoryScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const setStatusSelect = useSelector((state: RootState) => state.orderSlice.statusSelect)
    const data = useSelector((state: RootState) => {
        return state.orderSlice.data.filter((item) => {
            return item.status == setStatusSelect;
        })
    })
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Order History</Text>
            <View style={{ flex: 1, paddingTop: 10, }}>
                <View style={{ height: 30, }}>
                    <FlatList
                        data={Status}
                        renderItem={({ item }) => <ItemStatus item={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {data.length > 0 ? <View>
                    <FlatList
                        data={data}
                        renderItem={({ item }: any) => <ItemHistory item={item} />}
                        style={{ marginTop: 10 }}
                        ListFooterComponent={<View style={{ height: 50 }} />} />
                </View> : <NotYet
                    content='You have not ordered any food yet'
                    title='No orders yet'
                    nameIcon='event-note'
                    typeIcon={Icons.MaterialIcons}
                    colorIcon={Colors.BACKGROUND_COLOR}
                />}
            </View>
        </View >
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    textHeader: {
        fontFamily: 'SF Pro Rounded',
        width: WINDOW_WIDTH / 2 + 20,
        height: 82,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 34,
        lineHeight: 41,
        start: 15,
        marginTop: 40,
        color: 'black',
    },
})
