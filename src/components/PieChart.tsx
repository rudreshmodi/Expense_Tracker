import { useRef, useEffect, useContext } from "react";
import CategoriesContext from "../store/CategoriesContext";

type drawPieArgs = {
  context: CanvasRenderingContext2D;
  data: { type: string; amount: number; color: string }[];
};

function drawPie({ context, data }: drawPieArgs) {
  let totalAmount = data.reduce((sum, { amount }) => sum + amount, 0);

  let startAngle = 0;
  let radius = 150;
  let cx = 250;
  let cy = 200;

  context.clearRect(0, 0, 400, 400);
  data.forEach((entry) => {
    context.fillStyle = entry.color;
    context.lineWidth = 1;
    context.strokeStyle = "#333";
    context.beginPath();
    let endAngle = (entry.amount / totalAmount) * Math.PI * 2 + startAngle;
    context.moveTo(cx, cy);
    context.arc(cx, cy, radius, startAngle, endAngle, false);
    context.lineTo(cx, cy);
    context.fill();
    context.stroke();
    context.closePath();

    // add the labels
    context.beginPath();
    context.font = "12px sans-serif";
    context.textAlign = "center";
    context.fillStyle = entry.color;

    let theta = (startAngle + endAngle) / 2;
    let deltaY = Math.sin(theta) * 1.25 * radius;
    let deltaX = Math.cos(theta) * 1.25 * radius;
    context.fillText(entry.type, deltaX + cx, deltaY + cy);

    context.closePath();

    startAngle = endAngle;
  });
}

const PieChart = () => {
  const { getTotalAmount } = useContext(CategoriesContext);
  const expenses = getTotalAmount("Expenses");
  const budget = getTotalAmount("Budget");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const data = [
    {
      type: "Budget",
      amount: budget,
      color: "#4BDB6B",
    },
    { type: "Expenses", amount: expenses, color: "#FF6C6C" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    drawPie({ context, data });
  }, [budget, expenses]);

  return (
    // Use Tailwind for centering, size, and layout
    <canvas
      ref={canvasRef}
      width={450}
      height={400}
      className="mx-auto w-[450px] h-[400px] mt-4 mb-8"
    />
  );
};

export default PieChart;
