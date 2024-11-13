import { useContext } from "react";
import {
  SimpleGrid,
  Text,
  Button,
  Box,
  Center,
  Stack,
  Card,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../store/CategoriesContext";

const DisplayCategories = () => {
  const { categories } = useContext(CategoriesContext) || { categories: [] };
  const navigate = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing.xl,
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
        marginTop: theme.spacing.lg,
      })}
    >
      {categories && categories.length > 0 ? (
        <SimpleGrid cols={4} spacing="lg" sx={{ justifyContent: "center" }}>
          {categories.map((category) => {
            // Check if category label contains "budget" or "income" (case-insensitive)
            const isGreenTheme = /budget|income/i.test(category.label);
            const styles = isGreenTheme
              ? {
                  backgroundColor: "rgba(34, 197, 94, 0.1)", // light green background
                  color: "#22c55e", // green text and border
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)", // green shadow
                }
              : {
                  backgroundColor: "rgba(239, 68, 68, 0.1)", // light red background
                  color: "#ef4444", // red text and border
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)", // red shadow
                };

            return (
              <Card
                key={category.id}
                sx={(theme) => ({
                  backgroundColor: styles.backgroundColor,
                  color: styles.color,
                  boxShadow: styles.boxShadow,
                  borderRadius: theme.radius.md,
                  padding: theme.spacing.md,
                })}
              >
                <Text size="xl" weight={500}>
                  {category.label}
                </Text>
                <Text size="lg" >
                  ${category.amount}
                </Text>
              </Card>
            );
          })}
        </SimpleGrid>
      ) : (
        <Center>
          <Stack align="center">
            <Text size="lg" color="red">
              No category
            </Text>
            <Button
              variant="outline"
              color="blue"
              size="md"
              onClick={() => navigate("/newExpense")}
            >
              Add Expense
            </Button>
          </Stack>
        </Center>
      )}
    </Box>
  );
};

export default DisplayCategories;
