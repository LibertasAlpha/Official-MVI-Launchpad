import { drizzle } from "drizzle-orm/mysql2";
import { bankAccounts } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const seedBankAccounts = async () => {
  try {
    const existingAccounts = await db.select().from(bankAccounts);
    if (existingAccounts.length > 0) {
      console.log("Bank accounts already exist, skipping seed");
      return;
    }

    await db.insert(bankAccounts).values([
      {
        accountName: "Libertas Alpha Technologies",
        bankName: "Global Impact Bank",
        accountNumber: "1234567890",
        routingNumber: "021000021",
        swiftCode: "GIBAUS33",
        iban: "US12GIBA0001234567890",
        country: "United States",
        currency: "USD",
        isActive: 1,
      },
      {
        accountName: "Libertas Alpha Europe",
        bankName: "European Impact Finance",
        accountNumber: "DE89370400440532013000",
        routingNumber: null,
        swiftCode: "EIFADE33",
        iban: "DE89370400440532013000",
        country: "Germany",
        currency: "EUR",
        isActive: 1,
      },
    ]);

    console.log("Bank accounts seeded successfully!");
  } catch (error) {
    console.error("Error seeding bank accounts:", error);
    process.exit(1);
  }
};

seedBankAccounts();
