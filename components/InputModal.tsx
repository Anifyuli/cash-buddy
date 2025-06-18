import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";

interface InputModalProps {
  caption: string;
  icon?: string | (() => React.ReactNode);
  visible: boolean;
  onDismiss: () => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "number-pad" | "email-address" | "phone-pad";
}

export default function InputModal({
  caption,
  icon = "numeric",
  visible,
  onDismiss,
  onSubmit,
  placeholder = "Enter value...",
  keyboardType = "default",
}: InputModalProps) {
  const [inputValue, setInputValue] = React.useState("");

  const inputRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (visible) {
      // Delay sedikit untuk memastikan modal sudah fully rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleSubmit = () => {
    if (onSubmit && inputValue.trim()) {
      onSubmit(inputValue.trim());
    }
    setInputValue(""); // Reset input
    onDismiss(); // Close modal
  };

  const handleDismiss = () => {
    setInputValue(""); // Reset input when dismissed
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleDismiss}
        contentContainerStyle={styles.container}
        dismissable={true}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{caption}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={placeholder}
            left={<TextInput.Icon icon={icon} />}
            mode="outlined"
            keyboardType={keyboardType}
            style={styles.input}
            onSubmitEditing={handleSubmit}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handleDismiss}
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonText}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={!inputValue.trim()}
          >
            Submit
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
  },
  inputContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  input: {
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 24,
    paddingTop: 8,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    color: "#666",
  },
  submitButton: {
    flex: 1,
  },
});
