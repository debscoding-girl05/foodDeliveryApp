import React from 'react'
import { View, Text, StyleSheet, Alert, FlatList, Image } from 'react-native'
import useCommandStore from '../../../store/CommandStore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function CommandScreen() {
    const navigation = useNavigation();
    const {commands, updateCommandStatus} = useCommandStore();

    const handleOrderPress = (order) =>{
        navigation.navigate('DetailsCommand', {order});
    };

   

  return (
    <View styles={styles.container}>
        
        <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>LISTES DES COMMANDES </Text>
        </View>
        <View style={styles.pendingTitle}>
            <MaterialIcons name="pending-actions" size={30} color="crimson" />
            <Text style={styles.subtitle}>Commande(s) En Attente </Text>
        </View>
       

       <View>
        <FlatList
        data={commands.filter(command => command.status === 'pending')}
         keyExtractor={(item)=> item.id.toString()}
         renderItem={({item})=> (
            <View style={styles.orderItem}>
                <TouchableOpacity onPress={() => handleOrderPress(item)} style={styles.orderTouchable}>
                    <Text style={styles.orderText}>ID Order: {item.id}</Text>
                    <Text style={styles.orderText}>Total: {item.total}</Text>
                </TouchableOpacity>
               
            </View>
         )}/>
       </View>
        <View style={styles.pendingTitle2}>
            <FontAwesome6 name="check-to-slot" size={25} color="green" />
            <Text style={styles.subtitle}>Commande(s) Accepté(s) </Text>
        </View>
       <View>
        <FlatList
  data={commands.filter(command => command.status === 'accepted')}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleOrderPress(item)} style={styles.orderItem}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Total: {item.total} FCFA</Text>
      <TouchableOpacity onPress={() => completeOrder(item.id)} style={styles.acceptButton} >
        <Text style={styles.acceptButtonText} >Complete Delivery</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )}
/>
       </View>
    </View>
  )
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:"white"
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  orderTouchable: {
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
  },
  acceptButton: {
    backgroundColor: '#FFC107', 
    padding: 7,
    borderRadius: 15,
    alignItems: 'center',
    marginTop:5
  },
  acceptButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  mainTitle:{
    alignSelf:'center',
    margin:18,
    marginBottom:25
  },
  mainTitleText:{
    fontSize:20,
    fontWeight:'700'
  },
  subtitle:{
    fontSize:16,
    color:'#000',
    fontWeight:'600',
    marginTop:4
  },
  pendingTitle:{
    flexDirection:'row',
    gap:10,
    margin:5,
    marginHorizontal:15
  },
  pendingTitle2:{
    flexDirection:'row',
    gap:10,
    marginVertical:10,
    marginHorizontal:18,
    marginTop:20
  }

})