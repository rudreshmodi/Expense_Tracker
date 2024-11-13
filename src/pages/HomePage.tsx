import { useContext } from "react";
import { SimpleGrid, Text } from "@mantine/core";
import DisplayCard from "../components/DisplayCard";
import HistoryStack from "../components/HistoryStack";
import PageContainer from "../layout/PageContainer";
import PieChart from "../components/PieChart";
import CategoriesContext from "../store/CategoriesContext";

const HomePage = () => {
  const { getTotalAmount } = useContext(CategoriesContext);
  const budget = getTotalAmount("Budget");
  const expenses = getTotalAmount("Expenses");

  return (
    <PageContainer>
      {/* Displays the net balance of the user */}
      <Text
        size={35}
        weight={700}
        mb={6}
        className="text-xl font-bold text-center sm:text-3xl md:text-4xl lg:text-5xl text-black dark:text-gray-500"
        >
        YOUR BALANCE IS: ${budget - expenses}
      </Text>

      <SimpleGrid cols={2} spacing={20} className="grid-cols-1 md:grid-cols-2 gap-3">
        <DisplayCard label="Income / Budget" amount={budget} isBudget={true} />
        <DisplayCard label="Expenses" amount={expenses} isBudget={false} />
        <HistoryStack />

        {/* Only show the pie chart when either expenses or budget is greater than 0 */}
        {(budget > 0 || expenses > 0) && <PieChart />}
      </SimpleGrid>

      <div className="mt-8 px-4 md:px-8 lg:px-16 xl:px-24">
        {/* Optional: Add additional content, graphs, or components */}
      </div>
    </PageContainer>
  );
};

export default HomePage;
