/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, Image, Dimensions, Button } from 'react-native';
import { RkButton, RkSwitch, RkBadge, RkCard, RkText } from 'react-native-ui-kitten';
import CustomMapView from './CustomMapView'





export default class Details extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });


    constructor(props) {
        super(props)

        const { navigation } = this.props;
        const item = navigation.getParam('item');
        const rocketID = item.rocket_id
        console.log(item)

        this.state = {
            isLoading: true,
            item: rocketID
        }

        this.getPhoto()
        this.getRocketInfo(rocketID)

    }

    getPhoto() {

        fetch('https://api.thecatapi.com/v1/images/search?format=json')
            .then((response) => response.json())
            .then(([body]) => {
                console.log(body)
                console.log(body.url)

                this.setState({
                    image: body.url
                })
            })
            .catch(error => console.log(error.message))

    }

    getRocketInfo(id) {
        const url = 'https://api.spacexdata.com/v3/rockets/' + id
        console.log(url)

        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        const width = this.state.image ? Dimensions.get("window").width : 0
        const item = this.state.dataSource

        console.log("length", item.flickr_images.length)
        console.log(item.flickr_images[0])

        const imageContainer = item.flickr_images.length > 0 ? (
            <Image rkCardImg style={{
                width: width
            }} source={{ uri: item.flickr_images[0] }} />
        )
            :
            (
                <View></View>
            )


        return (
            <RkCard rkType='story' style={styles.cards}>

                {imageContainer}

                <View rkCardHeader>
                    <RkText rkType='header'>{item.rocket_name}</RkText>
                    <RkText rkType='header'>{item.company}</RkText>
                    <RkText rkType='header'>{item.rocket_type}</RkText>
                    <Button
                        onPress={() => {
                            this.props.navigation.push('CustomMapView')
                        }}
                        title="Map"
                    />
                </View>

                <View rkCardContent>
                    <RkText style={{ textAlign: 'justify' }}>
                        {item.description}
                    </RkText>
                </View>

                <View rkCardHeader>
                    <RkText rkType='header' style={{ fontSize: 12 }} >Active</RkText>
                    <RkText rkType='header'></RkText>
                    <RkText rkType='header' style={{ fontSize: 12 }} >{item.active.toString()}</RkText>
                </View>

                <View rkCardHeader>
                    <RkText rkType='header' style={{ fontSize: 12 }} >Cost per launch</RkText>
                    <RkText rkType='header'></RkText>
                    <RkText rkType='header' style={{ fontSize: 12 }} >{'$ ' + item.cost_per_launch.toString()}</RkText>
                </View>

                <View rkCardHeader>
                    <RkText rkType='header' style={{ fontSize: 12 }} >Propellant</RkText>
                    <RkText rkType='header'></RkText>
                    <RkText rkType='header' style={{ fontSize: 12 }} >{item.engines.propellant_1}</RkText>
                </View>

                <View rkCardHeader>
                    <RkText rkType='header' style={{ fontSize: 12 }} >Propellant</RkText>
                    <RkText rkType='header'></RkText>
                    <RkText rkType='header' style={{ fontSize: 12 }} >{item.engines.propellant_2}</RkText>
                </View>



            </RkCard>





        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
