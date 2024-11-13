import { useState, useContext } from "react";
import { Button, Modal, Text, Badge, Stack, Group } from "@mantine/core";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";

type HistoryModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  label: string;
  amount: number;
  dateCreated: string;
  id: string;
  type: string;
  category: string;
};

const HistoryModal = ({
  opened,
  setOpened,
  label,
  amount,
  dateCreated,
  type,
  id,
  category,
}: HistoryModalProps) => {
  const { deleteHistoryElement } = useContext(HistoryContext);
  const { subtractCategoryAmount, addCategory } = useContext(CategoriesContext);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const isExpense = type === "Expense";

  const handleDelete = () => {
    deleteHistoryElement(id);
    if (type === "Expenses Reset") {
      addCategory({
        label: "Uncategorized",
        amount: amount,
        id: crypto.randomUUID(),
      });
    } else if (type === "Budget Reset") {
      addCategory({
        label: "Budget",
        amount: amount,
        id: crypto.randomUUID(),
      });
    }
    subtractCategoryAmount(category, amount);
    setOpened(false);
    setConfirmationOpen(false);
  };

  return (
    <>
      {/* Main Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Transaction Details"
        centered
        radius="md"
        padding="lg"
        styles={{
          title: {
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
          },
          modal: {
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          },
        }}
      >
        {/* Details in Tag View */}
        <Stack spacing="sm" className="mt-1 mb-1">
          <Group position="apart" style={{ marginBottom: 8 }}>
            {/* Label */}
            <Text size="lg" weight={600} style={{ fontSize: "1rem" }}>Label:</Text>
            <Badge
              color="gray"
              size="lg"
              variant="filled"
              style={{
                borderRadius: "5px",
                textAlign: "left", // Align text left
                padding: "12px", // Add padding
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Ensure word wrapping inside the badge
              }}
            >
              {label}
            </Badge>
          </Group>

          <Group position="apart" style={{ marginBottom: 8 }}>
            {/* Type */}
            <Text size="lg" weight={600} style={{ fontSize: "1rem" }}>Type:</Text>
            <Badge
              color="gray"
              size="lg"
              variant="filled"
              style={{
                borderRadius: "5px",
                textAlign: "left", // Align text left
                padding: "12px", // Add padding
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Ensure word wrapping inside the badge
              }}
            >
              {type}
            </Badge>
          </Group>

          <Group position="apart" style={{ marginBottom: 8 }}>
            {/* Amount */}
            <Text size="lg" weight={600} style={{ fontSize: "1rem" }}>Amount:</Text>
            <Badge
              color="gray"
              size="lg"
              variant="filled"
              style={{
                borderRadius: "5px",
                fontSize: "1rem",
                color: isExpense ? "#ef4444" : "#22c55e",
                textAlign: "left", // Align text left
                padding: "12px", // Add padding
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Ensure word wrapping inside the badge
              }}
            >
              ${amount.toLocaleString()}
            </Badge>
          </Group>

          <Group position="apart" style={{ marginBottom: 8 }}>
            {/* Category */}
            <Text size="lg" weight={600} style={{ fontSize: "1rem" }}>Category:</Text>
            <Badge
              color="gray"
              size="lg"
              variant="filled"
              style={{
                borderRadius: "5px",
                textAlign: "left", // Align text left
                padding: "12px", // Add padding
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Ensure word wrapping inside the badge
              }}
            >
              {category}
            </Badge>
          </Group>

          <Group position="apart" style={{ marginBottom: 8 }}>
            {/* Date Created */}
            <Text size="lg" weight={600} style={{ fontSize: "1rem" }}>Date Created:</Text>
            <Badge
              color="gray"
              size="lg"
              variant="filled"
              style={{
                borderRadius: "5px",
                textAlign: "left", // Align text left
                padding: "12px", // Add padding
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Ensure word wrapping inside the badge
              }}
            >
              {dateCreated}
            </Badge>
          </Group>

          <Group position="apart" style={{ marginBottom: 8 }}>
            {/* ID */}
            <Text size="lg" weight={600} style={{ fontSize: "1rem" }}>ID:</Text>
            <Badge
              color="gray"
              size="lg"
              variant="filled"
              style={{
                borderRadius: "5px",
                textAlign: "left", // Align text left
                padding: "12px", // Add padding
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Ensure word wrapping inside the badge
              }}
            >
              {id}
            </Badge>
          </Group>
        </Stack>

        {/* Buttons */}
        <Group position="center" spacing="md" mt="xl">
          <Button
            variant="outline"
            color="gray"
            onClick={() => setOpened(false)}
          >
            Exit
          </Button>
          <Button color="red" onClick={() => setConfirmationOpen(true)}>
            Delete Item
          </Button>
        </Group>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        opened={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        title="Confirm Deletion"
        centered
        radius="md"
        padding="lg"
        styles={{
          title: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          },
          modal: {
            backgroundColor: "#fef2f2",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          },
        }}
      >
        <Text align="center" size="lg" weight={500}>
          Are you sure you want to delete this item?
        </Text>

        <Group position="center" spacing="md" mt="xl">
          <Button
            variant="outline"
            color="gray"
            onClick={() => setConfirmationOpen(false)}
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default HistoryModal;
