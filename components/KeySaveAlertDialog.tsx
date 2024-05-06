import { AlertDialog, Button, Form, Input, Spinner, XStack, YStack, Text } from 'tamagui'

export function KeySaveAlertDialog() {
    let value = 4;
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        {/* {true} */}
        {/* <Form onSubmit={() => 1+1} gap="$2">
            <Text>maiTea API Key:</Text>

            <Form.Trigger asChild>
                <Button>Save API Key</Button>
            </Form.Trigger>
                    
        </Form> */}
        {/* <Button>Save API Key</Button> */}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Accept</AlertDialog.Title>
            <AlertDialog.Description>
              By pressing yes, you accept our terms and conditions.
            </AlertDialog.Description>

            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button theme="active">Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}