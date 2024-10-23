import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Alert
} from "react-native";
import Animated ,{ Easing,FadeInDown, FadeInUp,SlideInLeft } from 'react-native-reanimated';
import {z} from 'zod';
import FormInput from '../../components/formInput';
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from '../../firebaseConfig';
 
const formSchema = z.object({
   name:z.string().min(3, "Nom doit avoir au moin 3 caractères"),
   surname:z.string().min(3, "Prenom doit avoir au moin 3 caractères"),
    email:z.string().email('Veuillez entrer un mail vaide'),
  password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
  confirmPassword: z.string().min(6, "La confirmation du mot de passe doit avoir au moins 6 caractères"),
  telephone: z.string().min(9, "Numéro de téléphone invalide"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"], 
});

export default function SignupScreen() {
     const auth = FIREBASE_AUTH;
     const firestoreDB = FIRESTORE_DB;

   const [loading, setLoading] =useState(false)
   const [userRole, setUserRole] = useState(null);

    const navigation= useNavigation();
    const {control,handleSubmit} = useForm({
      defaultValues:{
        name:'',
        surname:'',
        email:'',
        password:'',
        confirmPassword:'',
        telephone:''
      },
      resolver:zodResolver(formSchema),
    });
     const onSubmit = async (data)=>{
      setLoading(true);
       try {
         const userCredential = await createUserWithEmailAndPassword(
           auth,
           data.email,
           data.password
         );
         await setDoc(doc(firestoreDB, "users", userCredential.user.uid), {
           name: data.name,
           surname: data.surname,
           email: data.email,
           telephone: data.telephone,
           role:'Client'
           // Add any other fields you want to store
         });
         Alert.alert(
           "Inscription réussie!",
           `Bienvenue, ${data.name}`
         );
         navigation.push("Main");
       } catch (error) {
         Alert.alert("Erreur d'inscription", error.message);
       } finally {
         setLoading(false);
       }
    };

  return (
    <ScrollView>
      <View className="bg-white h-full w-full">
        <StatusBar style="dark" />

        {/*image*/}
        <View className="flex-row justify-around w-full absolute">
          <Animated.Image
            entering={SlideInLeft.duration(900).easing(Easing.in(Easing.quad))}
            className="h-[150] w-[300] mx-5 mt-20"
            source={require("../../assets/images/order.png")}
          />
        </View>
        {/*Title and form*/}
        <View className="h-full w-full justify-around pt-40">
          {/*Title*/}
          <View className="flex items-center mt-[60] mb-[1]">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-yellow-400 font-bold tracking-wider text-5xl  "
            >
              Inscription
            </Animated.Text>
          </View>

          {/*Form*/}
          <View className="flex items-center mx-4 space-y-4 mb-[15]">
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Animated.View
                  entering={FadeInDown.duration(1000).springify()}
                  className="bg-black/5 p-2 rounded-md 2xl w-full mb-3"
                >
                  <FormInput
                    control={control}
                    name={"name"}
                    placeholder="Nom"
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(200).duration(1000).springify()}
                  className="bg-black/5 p-2 rounded-md 2xl w-full mb-3"
                >
                  <FormInput
                    control={control}
                    name={"surname"}
                    placeholder="Prénom"
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(400).duration(1000).springify()}
                  className="bg-black/5 p-2 rounded-md 2xl w-full mb-3"
                >
                  <FormInput
                    control={control}
                    name={"password"}
                    placeholder="Mot de Passe"
                    secureTextEntry
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(600).duration(1000).springify()}
                  className="bg-black/5 p-2 rounded-md 2xl w-full mb-3"
                >
                  <FormInput
                    control={control}
                    name={"confirmPassword"}
                    placeholder="Confirmer Mot de Passe"
                    secureTextEntry
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(800).duration(1000).springify()}
                  className="bg-black/5 p-2 rounded-md 2xl w-full mb-3"
                >
                  <FormInput
                    control={control}
                    name={"email"}
                    placeholder="Email"
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(900).duration(1000).springify()}
                  className="bg-black/5 p-2 rounded-md 2xl w-full mb-3"
                >
                  <FormInput
                    control={control}
                    name={"telephone"}
                    placeholder="Téléphone"
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(1000).duration(1000).springify()}
                  className="w-full"
                >
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="w-full bg-yellow-400 p-3 rounded-2xl mb-1"
                  >
                    <Text className="text-l font-bold text-white text-center">
                      S'inscrire
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </>
            )}
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text>Deja un compte?</Text>
              <TouchableOpacity onPress={() => navigation.push("Login")}>
                <Text className="text-yellow-800 ">Se Connecter</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
