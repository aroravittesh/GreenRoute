import React from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-600 px-4 py-2 rounded-md active:bg-blue-700"
    >
      <Text className="text-white text-center font-semibold">{title}</Text>
    </Pressable>
  );
}
