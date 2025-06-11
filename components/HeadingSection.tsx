import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

export default function HeadingSection() {
  const theme = useTheme();

  return (
    <>
      <Text variant="headlineSmall" style={styles.greetingText}>
        Yo! Let's budget 💰
      </Text>
      <Card style={styles.card}>
        <Card.Title title="Balance" titleVariant="titleLarge" />
        <Card.Content>
          <View style={styles.balanceTextContainer}>
            <Text variant="displaySmall">IDR</Text>
            <Text variant="displaySmall" style={{ fontWeight: "700" }}>
              600K
            </Text>
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
  card: {
    padding: 8,
    marginVertical: 9,
  },
  greetingText: {
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  cardActions: {
    marginVertical: 5,
  },
  balanceTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
