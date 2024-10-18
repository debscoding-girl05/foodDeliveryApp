import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useCommandStore from '../../../store/CommandStore';

export default function DetailCommandScreen({route}) {
 const { order } = route.params;
 const {commands, updateCommandStatus} = useCommandStore();
   const handleAcceptOrder = (orderId) =>{
        updateCommandStatus(orderId, 'accepted');
        Alert.alert('Commande Accepter', 'La Commande a été accepter')

    };


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Details de la Commande</Text>
        <View>
    <View style={styles.labelsContainer}>
         <View style={styles.headerTitleCont}>
            <Text style={styles.headerTitle}>Informations Premières</Text>
        </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.secondlabel}> {order.id}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.secondlabel}> {order.total} FCFA</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Statut: </Text>
        <Text style={styles.secondlabel}> {order.status}</Text>
      </View>
       
       <View>
        <View style={styles.headerTitleCont}>
            <Text style={styles.headerTitle}>Informations du Client</Text>
        </View>
     
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Nom: </Text>
        <Text style={styles.secondlabel}>{order.customer.name}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Addresse: </Text>
        <Text style={styles.secondlabel}>{order.customer.address}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Tel: </Text>
        <Text style={styles.secondlabel}>{order.customer.phone}</Text>
      </View>
       </View>
       <View>
 
       </View>
       <View style={styles.headerTitleCont}>
            <Text style={styles.headerTitle}>Contenu</Text>
        </View>
      {order.items.map(item => (
          <View  key={item.id} style={styles.labelContainerItem}>
         <Text style={styles.label}>
          {item.name} 
        </Text>
         <Text style={styles.secondlabel}>
         (x{item.quantity}) 
        </Text>
         <Text style={styles.secondlabel}>
          {item.price} FCFA
        </Text>

          </View>
       
      ))}
      
        </View>
    </View>
     {order.status === 'pending' && (
        <TouchableOpacity 
          style={styles.acceptButton} 
          onPress={() => handleAcceptOrder(order.id)}
        >
          <Text style={styles.acceptButtonText}>Accepter Commande</Text>
        </TouchableOpacity>
      )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf:'center',
    marginTop:10
  },
  labelContainer:{
    flexDirection:'row',
    marginBottom:5,
    marginLeft:10,
    paddingHorizontal:5
  },
  labelsContainer:{
    elevation:4,
    shadowColor:"#000",
    paddingHorizontal:5,
    marginTop:5,
    shadowColor:"white",
    marginBottom:10
  },
  labelContainerItem:{
    flexDirection:'row',
    marginBottom:5,
    marginLeft:10,
    paddingHorizontal:5,
    gap:10
  },
  label:{
    fontSize:15,
    color:'#000',
    fontWeight:'500'
  },
  secondlabel:{
    fontSize:15,
    fontWeight:'400',
    marginTop:1,
    marginLeft:5
  },
  headerTitle:{
    fontSize:17,
    color:'#FFC107',
     fontWeight:'600',
     textAlign:'center',
     backgroundColor:'#FFF0D',
    },
  headerTitleCont:{
    marginBottom:10, 
    marginTop:15
  }, 
  acceptButton: {
    backgroundColor: '#FFC107', 
    padding: 9,
    borderRadius: 15,
    alignItems: 'center',
    marginTop:70,
    marginHorizontal:25
  },
  acceptButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
