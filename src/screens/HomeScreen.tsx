import { Text, FlatList } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";
import { LoveShackStake } from "../components/LoveShackStake";

export function HomeScreen() {
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
      <LoveShackStake children={null}></LoveShackStake>
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
