import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,  Dimensions, TouchableOpacity, Linking} from 'react-native';
import {RkButton, RkCard, RkText} from 'react-native-ui-kitten';
import PropTypes from 'prop-types'

import CountDown from 'react-native-countdown-component';

export default class NextLaunchCard extends Component {
    static propTypes = {
        title: PropTypes.string,
        date: PropTypes.string,
        countdown: PropTypes.string,
        details: PropTypes.string,
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'white',
            },
        });

    render() {

        const width = this.props.url_image ? Dimensions.get("window").width : 0

        const imageContainer = this.props.url_image ? (
            <Image rkCardImg style={{
                width: width
              }} source={{uri: this.props.url }} />
        )
        :
        (
            <View></View>
        )
        
        const launchDate = new Date(this.props.countdown.toString())
        const launchDateToSeconds = launchDate.getTime() / 1000
        const distance = launchDateToSeconds - (new Date().getTime() / 1000)

        return(
            <RkCard rkType='story' style={styles.cards}>

            <View rkCardHeader>
                <RkText rkType='header' style={{ fontSize: 25 , textAlign:'center',flex: 1, flexDirection: 'row', justifyContent: 'center'}} > {this.props.title.toString()} </RkText>
            </View>

            <View rkCardContent>
                <RkText rkType='header' style={{ fontSize: 16, textAlign:'center' }} >Remaining Time</RkText>
            </View>

            <View rkCardFooter>
                <CountDown style={{flex: 1, flexDirection: 'row', justifyContent: 'center', fontSize: 8 }}
                    size={ 30 }
                    until={ distance }
                    timeToShow={['D','H', 'M', 'S']}
                    timeLabels={{d: 'Days', h: 'Hours',m: 'Minutes', s: 'Seconds'}}                />

            </View>

            </RkCard>
        )

    }
}

const styles = StyleSheet.create({
    cards: {
        marginTop: 5,
        marginBottom: 5,
        width:  Dimensions.get('window').width - 20
      }
});