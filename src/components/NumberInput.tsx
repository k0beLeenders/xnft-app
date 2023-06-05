import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

interface NumberInputProps {
  min: number;
  max: number;
  amount: number;
  onValueChange: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  min,
  max,
  amount,
  onValueChange,
}) => {
  const handleChangeText = (text: string) => {
    const numericValue = Number(text);
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onValueChange(numericValue);
    }
  };

  return (
    <View>
      <TextInput
        style={[styles.input, { outlineStyle: "none" } as any]}
        keyboardType="numeric"
        onChangeText={handleChangeText}
        value={amount.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "150px",
    fontSize: 24,
    height: 40,
    borderWidth: 0,
    color: "white",
  },
});
