import { Spinner } from "tamagui";

type Props = {
    size: "small" | "large" | undefined;
};

export default function ColouredSpinner({ size }: Props) {

    return (
        <Spinner color="#ccc" size={size}></Spinner>
    )
}