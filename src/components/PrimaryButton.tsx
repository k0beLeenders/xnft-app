import React, { MutableRefObject, Ref, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  customStyles?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export default function PrimaryButton({ onPress, title, customStyles }: Props) {
  const pressableRef = useRef<any>();

  const hoverIn = () => {
    if (pressableRef.current) {
      pressableRef.current.style.textDecoration = "none";
      pressableRef.current.style.color = "#b73fcb";
      pressableRef.current.style.borderColor = "rgb(183, 63, 203)";
      pressableRef.current.style.backgroundColor = "transparent";
    }
  };

  const hoverOut = () => {
    if (pressableRef.current) {
      pressableRef.current.style = styles.button;
    }
  };

  return (
    <Pressable
      ref={pressableRef}
      style={[styles.button, customStyles]}
      onPress={onPress}
      onHoverIn={hoverIn}
      onHoverOut={hoverOut}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: "white",
    border: "1px solid #434343",
    borderColor: "#434343",
    textShadow: "0 -1px 0 rgb(0 0 0 / 12%)",
    backgroundColor: "#b73fcb",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 3px 2px",
    transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s",
    textAlign: "center",

    height: "32px",
    padding: "4px 15px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: 15,

    fontWeight: 700,
  },

  buttonHover: {
    textDecoration: "none",
    backgroundColor: "transparent",
    color: "#b73fcb",
    borderColor: "rgb(183, 63, 203)",
  },

  text: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: "bold",
    color: "inherit",
    letterSpacing: 0.25,
  },
});
