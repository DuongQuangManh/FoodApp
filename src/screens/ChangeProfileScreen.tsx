import { StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Header, Icon, Input, Loading, Toast } from '../components'
import { useNavigation } from '@react-navigation/native'
import { URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils'
import { Colors } from '../constants'
import { Icons } from '../components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { ItemLocation } from '../Item'
import DocumentPicker from 'react-native-document-picker';
import { setError, updateUser } from '../redux/userSlice'


const ChangeProfileScreen = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const user = useSelector((state: RootState) => state.userSlice.data)
    const address = useSelector((state: RootState) => state.addressSlice.data)
    const [img, setImg] = useState("");
    const [type, setType] = useState('');
    const [name, setName] = useState('');

    const loading = useSelector((state: RootState) => state.userSlice.loading)
    const error = useSelector((state: RootState) => state.userSlice.error)

    const handlerBack = () => {
        navigation.goBack();
        dispatch(setError(""));
    }

    const selectDoc = async () => {
        try {
            const resuls: any = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            setImg(resuls[0].uri);
            setType(resuls[0].type);
            setName(resuls[0].name);

            console.log(resuls);
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                console.log('User cancelled the upload', err);
            else console.log(err);
        }
    };


    useEffect(() => {
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setEmail(user.email);
        setPhone(user.phone);
        setImg(user.img);
    }, [])

    const dispatch = useDispatch<AppDispatch>();
    const handlerAddress = () => {
        navigation.navigate("AddressScreen")
    }
    const handlerUpdate = () => {
        let formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('phone', phone)
        if (type) {
            formData.append('image', {
                uri: img,
                type: type,
                name: name,
            });
        }
        dispatch(updateUser({ formData, user }))
    }
    const icon = <Icon type={Icons.FontAwesome} name='save' size={25} color='black' />
    return (

        <View style={{ flex: 1, }}>
            <Header label='Edit profile' onBack={handlerBack} icon={icon} onSub={handlerUpdate} />
            <ScrollView >
                <View style={styles.box1}>
                    <TouchableOpacity onPress={selectDoc}>
                        <Image source={{ uri: `${URL}/uploads/${img}` }} style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.box2}>
                        <Input
                            label='FirstName'
                            width={WINDOW_WIDTH - 40}
                            height={45}
                            containsStyle={{ width: "90%" }}
                            extraProps={
                                {
                                    value: firstname,
                                    onChangeText: setFirstName,
                                    placeholder: "FirstName"
                                }
                            }
                        />
                        <Input
                            label='LastName'
                            width={WINDOW_WIDTH - 40}
                            height={45}
                            containsStyle={{ width: "90%" }}
                            extraProps={
                                {
                                    value: lastname,
                                    onChangeText: setLastName,
                                    placeholder: "LastName"
                                }
                            }
                        />
                        <Input
                            label='Phone'
                            width={WINDOW_WIDTH - 40}
                            height={45}
                            containsStyle={{ width: "90%" }}
                            extraProps={
                                {
                                    value: phone,
                                    onChangeText: setPhone,
                                    placeholder: "Phone",
                                }
                            }
                        />

                        <Input
                            label='Email'
                            width={WINDOW_WIDTH - 40}
                            height={45}
                            containsStyle={{ width: "90%" }}
                            extraProps={
                                {
                                    value: email,
                                    onChangeText: setEmail,
                                    placeholder: "Email"
                                }
                            }
                        />
                    </View>
                    <View style={styles.box3}>
                        <View style={{ width: "100%", justifyContent: 'space-between', alignItems: 'center', flexDirection: "row" }}>
                            <Text style={styles.txtar}>Địa chỉ của bạn:</Text>
                            <TouchableOpacity onPress={handlerAddress} style={styles.btnAdd}>
                                <Icon type={Icons.Ionicons} name='add' size={26} color='black' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            {address.map((item, index) => {
                                console.log(item)
                                return <ItemLocation item={item} key={index} />
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
            {loading && <Loading />}
            {error && <Toast message={error} />}
        </View>
    )
}

export default ChangeProfileScreen

const styles = StyleSheet.create({
    box1: {
        width: WINDOW_WIDTH,
        alignItems: 'center',
        padding: 10,
    },
    img: {
        width: WINDOW_WIDTH / 3,
        height: WINDOW_WIDTH / 3,
        borderRadius: 180,
        borderColor: Colors.WHITE_COLOR,
        borderWidth: 3,
    },
    boxOfname: {
        width: WINDOW_WIDTH * 2 / 3 - 20,
        height: WINDOW_WIDTH / 5,
        paddingStart: 10,
    },
    name: {
        fontWeight: "bold",
        fontSize: 18,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        width: '100%',
        height: '50%',
    },
    box2: {
        width: WINDOW_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    box3: {
        width: WINDOW_WIDTH - 10,
        padding: 5,
        marginTop: 20,
        alignItems: 'center',
        borderColor: "gray",
        borderWidth: 1,
        paddingBottom: 10,
    },
    btnAdd: {
        height: 30
    },
    txtar: {
        fontWeight: "bold",
        fontSize: 16,
    },
})