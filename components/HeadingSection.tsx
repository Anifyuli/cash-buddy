import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  MD3Colors,
  Text,
  useTheme,
} from "react-native-paper";
import InputModal from "./InputModal";

export default function HeadingSection() {
  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const handleEditBalance = () => {
    setModalVisible(true);
    setTimeout(() => {
      Keyboard.addListener("keyboardDidShow", () =>
        console.log("Keyboard did show")
      );
    }, 200);
  };

  const handleModalDismiss = () => {
    setModalVisible(false);
  };

  function handleBalanceSubmit(value: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Text variant="displaySmall" style={styles.greetingText}>
        Cash Buddy 💰
      </Text>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <Text variant="labelLarge" style={styles.balanceLabel}>
              Current Balance
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text variant="headlineLarge" style={styles.balanceAmount}>
                IDR 600K
              </Text>
              <IconButton
                icon="pencil"
                mode="contained"
                size={16}
                onPress={() => {
                  handleEditBalance();
                }}
                style={{
                  margin: 0,
                  marginLeft: 10,
                }}
              />
              <InputModal
                caption="Change your balance value"
                visible={modalVisible}
                onDismiss={handleModalDismiss}
                onSubmit={handleBalanceSubmit}
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="bodyLarge" style={styles.statLabel}>
                Income
              </Text>
              <Text
                variant="titleLarge"
                style={[styles.statAmount, { color: theme.colors.tertiary }]}
              >
                +700K
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <Text variant="bodyLarge" style={styles.statLabel}>
                Expense
              </Text>
              <Text
                variant="titleLarge"
                style={[styles.statAmount, { color: theme.colors.error }]}
              >
                -100K
              </Text>
            </View>
          </View>
        </Card.Content>

        <Card.Actions style={styles.cardActions}>
          <Button
            icon="plus"
            mode="contained-tonal"
            buttonColor={theme.colors.tertiary}
            textColor={theme.colors.onTertiary}
          >
            Income
          </Button>
          <Button
            icon="minus"
            mode="contained-tonal"
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
          >
            Expense
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  greetingText: {
    paddingHorizontal: 5,
    marginVertical: 5,
    fontWeight: "200",
  },
  card: {
    padding: 5,
    marginVertical: 8,
    elevation: 2,
  },
  cardContent: {
    paddingVertical: 16,
  },
  balanceSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  balanceLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  balanceAmount: {
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    opacity: 0.6,
    marginBottom: 2,
  },
  statAmount: {
    fontWeight: "600",
  },
  divider: {
    width: 2,
    height: 32,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 1,
    marginHorizontal: 16,
  },
  cardActions: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
