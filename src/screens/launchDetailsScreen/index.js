import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
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

_onPressRocket = (item) => {

    this.props.navigation.push('Details', {
      item: item.rocket,
      title: item.rocket.rocket_name
    })
  };


    getLaunchInfo(id) {
        const url = 'https://api.spacexdata.com/v3/launches/' + 78
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

        return (
            <RkCard rkType='story' style={styles.cards}>
                <TouchableOpacity onPress={ () => this._onPressRocket(item)}>

                <View rkCardHeader>
                <RkText rkType='header'>{item.mission_name}</RkText>
                <RkText rkType='header'>{item.company}</RkText>
                <RkText rkType='header'>{item.rocket.rocket_name}</RkText>
                </View>

                </TouchableOpacity>

                <View rkCardContent>
                    <RkText style={{ textAlign: 'justify' }}>
                        {item.description}
                    </RkText>
                </View>

                <View rkCardHeader>
                <RkText rkType='header' style={{ fontSize: 12 , textAlign:'center'}} >Upcoming</RkText>
                <RkText rkType='header'></RkText>
                <RkText rkType='header' style={{ fontSize: 12 , textAlign:'center'}} >{item.upcoming.toString()}</RkText>
                </View>

                <View rkCardHeader>
                <RkText rkType='header' style={{ fontSize: 12, textAlign:'center' }} >Launch Year</RkText>
                <RkText rkType='header'></RkText>
                <RkText rkType='header' style={{ fontSize: 12 , textAlign:'center'}} >{item.launch_year.toString()}</RkText>
                </View>

                <View rkCardHeader>
                <RkText rkType='header' style={{ fontSize: 12 , textAlign:'center'}} >Details</RkText>
                <RkText rkType='header'></RkText>
                <RkText rkType='header' style={{ fontSize: 12 , textAlign:'center'}} >{item.details}</RkText>
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