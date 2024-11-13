import { Card, Text } from "@mantine/core";

type DisplayCardProps = {
  label: string;
  amount: number;
  isBudget: boolean;
};

const DisplayCard = ({ label, amount, isBudget }: DisplayCardProps) => {
  // Define styles based on whether it's a budget or expense card
  const styles = isBudget
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
      shadow="sm"
      p="xl"
      mb={50}
      style={{
        height: "200px",
        textAlign: "center",
        borderRadius: "15px",
        border: `2px solid ${styles.color}`,
        backgroundColor: styles.backgroundColor,
        boxShadow: styles.boxShadow,
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Text weight={500} size={35} mt="md" style={{ color: styles.color }}>
        {label}
      </Text>
      <Text mt="xs" size={35} style={{ color: styles.color, fontWeight: 700 }}>
        ${amount.toLocaleString("en-US")}
      </Text>
    </Card>
  );
};

export default DisplayCard;
