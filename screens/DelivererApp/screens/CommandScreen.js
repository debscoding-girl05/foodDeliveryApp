import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, FlatList, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import useCommandStore from '../../../store/CommandStore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function CommandScreen() {
    const navigation = useNavigation();
    const {commands, updateCommandStatus} = useCommandStore();
    const [selectedStatus, setSelectedStatus] = useState('all');
    const handleOrderPress = (order) =>{
        navigation.navigate('DetailsCommand', {order});
    };
  
 const filteredCommands = selectedStatus === 'all'
    ? commands
    : commands.filter(command => command.status === selectedStatus);

    console.log('Commands:', commands);
    const getStatusDetails = (status) => {
        switch (status) {
            case 'pending':
                return { title: 'Commande(s) En Attente', icon: <MaterialIcons name="pending-actions" size={30} color="crimson" /> };
            case 'accepted':
                return { title: 'Commande(s) Acceptée(s)', icon: <FontAwesome6 name="check-to-slot" size={25} color="green" /> };
            case 'completed':
                return { title: 'Commande(s) Terminée(s)', icon: <FontAwesome6 name="check-circle" size={25} color="blue" /> };
            default:
                return { title: 'Toutes les Commandes', icon: <MaterialIcons name="list-alt" size={30} color="black" /> };
        }
    };
    const { title, icon } = getStatusDetails(selectedStatus);

  return (
    <View style={styles.container}>
        <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>LISTES DES COMMANDES </Text>
        </View>
    
    <View style={styles.filterContainer}>
       <Text style={styles.filterLabel}>Filtrer par statut:</Text>
       <RNPickerSelect
          onValueChange={(value)=>setSelectedStatus(value)}
          placeholder={{label: "Tous", value: "all"}}
          items={[
            {label: "En Attente", value: "pending"},    
            {label: "Acceptée", value: "accepted"},
            {label: "Terminée", value: "completed"},
          ]}
          style={pickerSelectStyles}
          />
    </View>

        <View style={styles.pendingTitle}>
            {icon}
            <Text style={styles.subtitle}> {title} </Text>
        </View>
       

       <View style={styles.flatStyle}>
        <FlatList
        data={filteredCommands}
         keyExtractor={(item)=> item.id.toString()}
         renderItem={({item})=> (
            <View style={[styles.orderItem,
              item.status === 'accepted'
              ? styles.accepted
              : item.status === 'completed'
              ? styles.completed
              : styles.notAccepted
            ]}>
                <TouchableOpacity onPress={() => handleOrderPress(item)} style={styles.orderTouchable}>
                    <Text style={styles.orderText}>ID Order: {item.id}</Text>
                    <Text style={styles.orderText}>Total: {item.total}</Text>
                </TouchableOpacity>
               
            </View>
         )}
         ListEmptyComponent={<Text style={styles.noDataText}>Aucune commande disponible</Text>}/>
       </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
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
    backgroundColor: "#FFC107",
    padding: 7,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 5,
  },
  acceptButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  mainTitle: {
    alignSelf: "center",
    margin: 18,
    marginBottom: 25,
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginTop: 4,
  },
  pendingTitle: {
    flexDirection: "row",
    gap: 10,
    margin: 5,
    marginHorizontal: 15,
  },
  pendingTitle2: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    marginHorizontal: 18,
    marginTop: 20,
  },
  filterContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  flatStyle: {
    marginTop: 15,
  },
  notAccepted: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  accepted: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
    backdropFilter: "blur(50px)",
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  completed: {
    backgroundColor: "rgba(0, 0, 255, 0.1)", 
    backdropFilter: "blur(10px)", 
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});
const pickerSelectStyles = {
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is not overlapping the icon
    },
};