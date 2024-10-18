import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import FormInput from "../../../components/formInput";
import Feather from "@expo/vector-icons/Feather";

const schema = z.object({
  name: z.string().min(2, "Le Nom doit avoir au moins deux caractères"),
  email: z.string().email("Addresse e-mail invalide"),
  phone: z.string().min(9, "Un Numero Camerounais a minimum 9 chiffres"),
  profilePicture: z
    .any()
    .refine((file) => file !== null, "Il vous faut une photo de profile"),
});

const defaultImage = require("../../../assets/images/sky.jpg");

export default function ModalScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profilePicture: null,
    },
  });

  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle form submission logic here
  };

  // Function to pick an image from the device
  const pickImage = async () => {
    // Ask for permission to access the gallery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Updated to reflect the current API
      setValue("profilePicture", result.assets[0].uri); // Set the image in form state
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather
          name="chevron-left"
          size={26}
          color="#FFC107"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <Text style={styles.header}>Edition Informations Personnels</Text>

      <FormInput
        control={control}
        name="name"
        placeholder="Nom"
        style={styles.input}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <FormInput
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <FormInput
        control={control}
        name="phone"
        placeholder="Numero de Telephone"
        keyboardType="phone-pad"
        style={styles.input}
      />
      {errors.phone && (
        <Text style={styles.errorText}>{errors.phone.message}</Text>
      )}

      <View style={styles.imagePickerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Selectionner une Image </Text>
        </TouchableOpacity>

        <Image
          source={image ? { uri: image } : defaultImage} // Use the selected image or the default one
          style={styles.profileImage}
        />
        {errors.profilePicture && (
          <Text style={styles.errorText}>{errors.profilePicture.message}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText2}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  imagePickerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#FFC107",
    borderWidth: 2,
    borderColor: "#FFC107",
    borderRadius: 25,
    padding: 5,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
  },
  buttonText2: {
    fontWeight: "700",
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize:17
  },
});
