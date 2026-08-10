import { prisma } from "../src/lib/prisma";

const categories = [
  {
    name: "Food",
    description: "Restaurants, groceries, and dining",
    icon: "utensils",
    userId: null,
  },
  {
    name: "Transport",
    description: "Fuel, public transport, and travel",
    icon: "car",
    userId: null,
  },
  {
    name: "Shopping",
    description: "Clothes, electronics, and other purchases",
    icon: "shopping-cart",
    userId: null,
  },
  {
    name: "Bills",
    description: "Utilities, rent, and subscriptions",
    icon: "receipt",
    userId: null,
  },
  {
    name: "Entertainment",
    description: "Movies, games, and leisure activities",
    icon: "gamepad-2",
    userId: null,
  },
  {
    name: "Health",
    description: "Medical, pharmacy, and healthcare",
    icon: "heart-pulse",
    userId: null,
  },
  {
    name: "Education",
    description: "Courses, books, and educational expenses",
    icon: "graduation-cap",
    userId: null,
  },
  {
    name: "Salary",
    description: "Monthly salary and wages",
    icon: "banknote",
    userId: null,
  },
  {
    name: "Freelance",
    description: "Income from freelance work",
    icon: "briefcase",
    userId: null,
  },
  {
    name: "Investment",
    description: "Returns from investments",
    icon: "chart-no-axes-combined",
    userId: null,
  },
];

async function main() {
  const result = await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log("Categories inserted:", result.count);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });