import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { Controller } from 'react-hook-form';

const FormInput = ({control, name,...otherProps}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error }})=>(
      <>
        <TextInput
        placeholderTextColor={'gray'}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        {...otherProps}
        />
        {error && <Text className="text-red-600 text-xs self-stretch mt-[2]">
                  {error.message}
                  </Text>
        }
      </>
      )}
    />
  )
}
export default FormInput;