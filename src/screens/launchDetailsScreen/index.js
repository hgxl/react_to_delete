import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, Image, Dimensions } from 'react-native';
import { RkButton, RkSwitch, RkBadge, RkCard, RkText } from 'react-native-ui-kitten';


export default class launchDetailsScreen extends Component {

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
        const missionID = item.mission_id
        console.log(item)

        this.state = {
            isLoading: true,
            item: missionID
        }

        this.getLaunchInfo(missionID)

    }


    getLaunchInfo(id) {
        const url = 'https://api.spacexdata.com/v3/launches/' + id
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
        /*
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

        */
        return (
            <RkCard rkType='story' style={styles.cards}>
            
                <View rkCardHeader>
                <RkText rkType='header'>{item.mission_name}</RkText>
                <RkText rkType='header'>{item.company}</RkText>
                <RkText rkType='header'>{item.rocket_name}</RkText>
                </View>

                <View rkCardContent>
                    <RkText style={{ textAlign: 'justify' }}>
                        {item.description}
                    </RkText>
                </View>

                <View rkCardHeader>
                <RkText rkType='header' style={{ fontSize: 12 }} >Active</RkText>
                <RkText rkType='header'></RkText>
                <RkText rkType='header' style={{ fontSize: 12 }} >{item.upcoming.toString()}</RkText>
                </View>

                <View rkCardHeader>
                <RkText rkType='header' style={{ fontSize: 12 }} >Launch Year</RkText>
                <RkText rkType='header'></RkText>
                <RkText rkType='header' style={{ fontSize: 12 }} >{item.launch_year.toString()}</RkText>
                </View>

                <View rkCardHeader>
                <RkText rkType='header' style={{ fontSize: 12 }} >Details</RkText>
                <RkText rkType='header'></RkText>
                <RkText rkType='header' style={{ fontSize: 12 }} >{item.details}</RkText>
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