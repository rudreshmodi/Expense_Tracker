import { useContext } from "react";
import { SimpleGrid, Text, Button, Box, Center, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import CategoriesContext from "../store/CategoriesContext";

const DisplayCategories = () => {
  const { categories } = useContext(CategoriesContext) || { categories: [] };
  const navigate = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing.xl,
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
        marginTop: theme.spacing.lg,
      })}
    >
      {categories && categories.length > 0 ? (
        <SimpleGrid cols={4} spacing="lg" style={{ justifyContent: "center" }}>
          {categories.map((category) => (
            <DisplayCard
              key={category.id}
              label={category.label}
              amount={category.amount}
              color="gray"
            />
          ))}
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
