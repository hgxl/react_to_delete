/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,  Dimensions, TouchableOpacity, Linking} from 'react-native';
import {RkButton, RkCard, RkText} from 'react-native-ui-kitten';
import PropTypes from 'prop-types'
 

export default class CustomCard extends React.Component {
  
    static propTypes = {
        url_image: PropTypes.string,
        title: PropTypes.string,
        desc: PropTypes.string,
        wikipedia: PropTypes.string,
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'white',
            },
        });

        
    _openUrl = () => {
        Linking.openURL(this.props.wikipedia).catch(err => console.error('An error occurred', err));
    }

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

       

      return (
        <RkCard rkType='story' style={styles.cards}>

        
            {imageContainer}
  
          <View rkCardHeader>
            <RkText rkType='header'>{this.props.title}</RkText>
          </View>

          <View rkCardContent>
            <RkText style={{textAlign:'justify'}}>
              {this.props.desc}
            </RkText>
          </View>

          <View rkCardFooter>
            <RkButton rkType='small outline' onPress={this._openUrl} >Wikipedia</RkButton>
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
