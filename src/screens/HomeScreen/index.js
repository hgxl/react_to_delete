/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { FlatList, ActivityIndicator, StyleSheet, 
  Text, View, Button, TouchableWithoutFeedback, Alert, TouchableOpacity,
Image, Dimensions
} from 'react-native';

import { throwStatement } from '@babel/types';

import CustomCard from '../../components/CustomCard/'

export default class Home extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Rockets',
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });


  constructor(props) {
    super(props)
    this.state ={ isLoading: true}

    this.getLaunches()
  }

  getLaunches(){
    return fetch('https://api.spacexdata.com/v3/rockets')
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  


  _onPress = (item) => {

    this.props.navigation.push('Details', {
      item: item,
      title: item.rocket_name
    })
  };

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    const image = 'https://cdn2.thecatapi.com/images/124.jpg'

     return(
      <View style={styles.container} >
      
   


        <FlatList
          data={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          renderItem={
            ({item}) => 

            <TouchableOpacity onPress={ () => this._onPress(item)}>

            <CustomCard style={styles.cards}
              title={item.rocket_name}
              desc={item.description}
              wikipedia={item.wikipedia}
              />

            </TouchableOpacity>
          }
          // keyExtractor={(item, index) => item.flight_number}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  }
  
});
