import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import tw from "twrnc";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";
import { TokenRow } from "../components/TokenRow";
import { VendingMachineLanding } from "../components/VendingMachine/VendingMachineLanding";

export function IncubatorScreen() {
  const features = [
    "tailwind",
    "recoil",
    "native styling",
    "fetching code from an API",
    "using a FlatList to render data",
    "Image for both remote & local images",
    "custom fonts",
    "sign a transaction / message",
    "theme hook with light/dark support",
  ];

  return (
    <Screen>
      <VendingMachineLanding children={null}></VendingMachineLanding>
      {/* <Text style={tw`mb-4`}>
        You'll find several examples of how to build xNFTs using react-native:
      </Text>
      <FlatList
        data={features}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>- {item}</Text>}
      /> */}
    </Screen>
  );
}
