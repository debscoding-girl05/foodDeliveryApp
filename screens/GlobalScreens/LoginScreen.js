import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native'
import { Alert,View, Text, Image, TextInput, Button } from 'react-native'
import Animated ,{ Easing,FadeInDown, FadeInUp,SlideInLeft } from 'react-native-reanimated';
import FormInput from '../../components/formInput';
import {z} from 'zod';

const formSchema = z.object({
   email:z.string().email('Veuillez entrer un mail vaide'),
   password:z.string().min(8, "Password doit contenir au moins 8 caractères")
});

export default function LoginScreen() {
    const navigation= useNavigation();
    const {control,handleSubmit} = useForm({
      defaultValues:{
         email:'',
         password:''
      },
      resolver:zodResolver(formSchema),
    });

    const onSubmit =(data)=>{
      Alert.alert("Successful")
      navigation.push('Main')
    }
  return (
    <ScrollView>
      <View className="bg-white h-full w-full">
        <StatusBar style="dark" />
        <Image
          className="h-60 w-80 absolute mt-20 ml-11"
          source={require("../../assets/images/circle.png")}
        />

        {/*Lights*/}
        <View className="flex-row justify-around w-full absolute">
          <Animated.Image
            entering={SlideInLeft.duration(900).easing(Easing.in(Easing.quad))}
            className="h-[365] w-[300] mx-5 mt-11"
            source={require("../../assets/images/delivery.png")}
          />
        </View>
        {/*Title and form*/}
        <View className="h-full w-full justify-around pt-40 pb-10">
          {/*Title*/}
          <View className="flex items-center mt-[200]">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-blue-300 font-bold tracking-wider text-5xl  "
            >
              Connexion
            </Animated.Text>
          </View>

          {/*Form*/}
          <View className="flex items-center mx-4 space-y-4 pb-5">
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="bg-black/5 p-4 rounded-xl 2xl w-full"
            >
              <FormInput control={control} name={"email"} placeholder="email" />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="bg-black/5 p-4 rounded-xl 2xl w-full mb-3 text-left"
            >
              <FormInput
                control={control}
                name={"password"}
                placeholder="Mot de Passe"
                secureTextEntry
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="w-full"
            >
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="w-full  bg-yellow-400 p-3 rounded-2xl mb-3"
              >
                <Text className="text-xl font-bold text-white text-center">
                  Enregistrer
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <TouchableOpacity>
                <Text>Mot de Passe Oublier ?</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text>Pas encore de compte?</Text>
              <TouchableOpacity onPress={() => navigation.push("Signup")}>
                <Text className="text-yellow-800">S'inscrire</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
