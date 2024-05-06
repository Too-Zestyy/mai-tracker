import { Text, Stack } from "tamagui";

type Props = {
  selected: boolean;
  onPress: () => void;
  title: string;
  icon: React.ReactNode;
};

export const FooterButton = ({ selected, onPress, title, icon }: Props) => {
  return (
    <Stack
      jc="center"
      ai="center"
      opacity={1}
      // opacity={selected ? 1 : 0.4}
      backgroundColor={selected ? "#0c0910" : "$purple5"}
      pt="$2"
      paddingBottom="$2"
      flex={1}
      onPress={onPress}
      // TODO: Rounding that is correctly placed so that buttons do not leave background colour "indents"
      // borderRadius="$2"
      // borderTopRightRadius="$2"
      // borderTopLeftRadius="$2"
    >
      {icon}
      {/* <Text color="white" fontSize="$2">
        {title}
      </Text> */}
    </Stack>
  );
};
