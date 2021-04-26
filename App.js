import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import Screen from "./app/components/Screen";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
    requestPermissionsAsync,
    getCurrentPositionAsync, requestForegroundPermissionsAsync,
} from 'expo-location';
import MapView, {Marker, Callout} from 'react-native-maps';
import AddUserScreen from "./screens/AddUserScreen";
import UserScreen from "./screens/UserScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import {createStackNavigator} from '@react-navigation/stack';
import * as MediaLibrary from 'expo-media-library';

/* CAMERA */
function ImagePickerExample() {
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('désolé, Vous devez pemettre  à l\'application d\'accéder à l\'appareil photo.!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(result.uri);
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const pickImage2 = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.6,
            allowsEditing: true
        });

        await MediaLibrary.saveToLibraryAsync(result.uri);
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title="Importer depuis la galerie" onPress={pickImage}/>
            {image && <Image source={{uri: image}} style={{width: 300, height: 300}}/>}
            <Button title="Prendre la photo" onPress={pickImage2}/>
            {image2 && <Image source={{uri: image2}} style={{width: 300, height: 300}}/>}
        </View>
    );
}


/* LOCALISATION */

function Main() {
    const [currentRegion, setCurrentRegion] = useState();
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const {granted} = await requestForegroundPermissionsAsync();

            if (!granted) {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            if (granted) {
                let location = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = location.coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }

        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (currentRegion) {
        text = currentRegion;
        // text = JSON.stringify(currentRegion);
    }


    return (
        <>
            <MapView initialRegion={currentRegion} style={stylesa.map}>

            </MapView>
            <View style={stylesa.para}>
                <Text style={stylesa.paragraph}>LATITUDE : {text.latitude}</Text>
                <Text style={stylesa.paragraph}>LONGITUDE : {text.longitude}</Text>
            </View>
        </>
    );
}

const stylesa = StyleSheet.create({
    map: {
        flex: 1,
    },
    para: {
        margin: 25,
    },
    paragraph: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 16,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: 'orange',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
});

/* CRUD */

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#621FF7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="AddUserScreen"
                component={AddUserScreen}
                options={{title: 'Ajouter un Article'}}
            />
            <Stack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{title: 'Liste d\'Articles'}}
            />
            <Stack.Screen
                name="UserDetailScreen"
                component={UserDetailScreen}
                options={{title: 'Détail de l\'article'}}
            />
        </Stack.Navigator>
    );
}

/*
const Stack1 = createStackNavigator();
const StackNavigator = () => (
        <Stack1.Navigator>
            <Stack1.Screen name="Tweets" component={Tweets}/>
            <Stack1.Screen  name="TweetDetails" component={TweetDetails}/>
        </Stack1.Navigator>
)
*/

const Tweets = ({navigation}) => (
    <Screen>
        <Text>Tweets</Text>
        <Button
            title="View Tweet"
            onPress={() => navigation.navigate("TweetsDetails", {id: 1})}
        />
    </Screen>
);

const TweetDetails = ({route}) => (
    <Screen>
        <Text>Tweet details {route.params.id}</Text>
    </Screen>
);


const AccountNavigator = () => (
    <Screen>
        <Text>
            Account
        </Text>
    </Screen>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor: "tomato",
            activeTintColor: "white",
            inactiveBackgroundColor: "#eee",
            inactiveTintColor: "black",
        }}
    >
        <Tab.Screen name="CAMERA" component={ImagePickerExample}/>
        <Tab.Screen name="CRUD" component={MyStack}/>
        <Tab.Screen name="LOCALISATION" component={Main}/>
    </Tab.Navigator>
);


export default function App() {
    return (
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
