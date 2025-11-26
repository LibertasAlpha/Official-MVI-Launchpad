import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const sampleProjects = [
  {
    name: "Libertas Alpha Water Project (LAWP)",
    description: "Foundational pilot MVI for a decentralized, non-profit water consumption culture, replacing single-use plastic sachets with a durable dispenser can.",
    status: "live",
    targetAmount: 50000000,
    raisedAmount: 37500000,
    contributionTokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    impactTokenAddress: "0x1234567890123456789012345678901234567890",
    projectDetails: JSON.stringify({
      impactTarget: "Prevent 1,000,000 pieces of plastic waste and enable clean water access",
      financialProjection: "208.1% accumulated ROI in 36 months via Impact Operational Grants",
      nonProfitMandate: "LTD/GTE compliant with Multi-Signature Community Treasury Smart Contract",
    }),
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop",
  },
  {
    name: "Community Solar Initiative",
    description: "Decentralized renewable energy project bringing solar power to underserved communities across Africa.",
    status: "live",
    targetAmount: 75000000,
    raisedAmount: 45000000,
    contributionTokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    impactTokenAddress: "0x2345678901234567890123456789012345678901",
    projectDetails: JSON.stringify({
      impactTarget: "Provide clean energy to 50,000 households",
      financialProjection: "150% ROI in 24 months",
      nonProfitMandate: "Community-owned cooperative structure",
    }),
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=500&h=300&fit=crop",
  },
  {
    name: "Education for All",
    description: "Global initiative to provide quality education and digital literacy training to underprivileged youth.",
    status: "coming_soon",
    targetAmount: 100000000,
    raisedAmount: 0,
    contributionTokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    impactTokenAddress: "0x3456789012345678901234567890123456789012",
    projectDetails: JSON.stringify({
      impactTarget: "Educate 100,000 students globally",
      financialProjection: "Sustainable impact model with 5-year ROI",
      nonProfitMandate: "NGO partnership framework",
    }),
    imageUrl: "https://images.unsplash.com/photo-1427504494785-cdae8dfb7d5b?w=500&h=300&fit=crop",
  },
  {
    name: "Ocean Cleanup Network",
    description: "Decentralized network for cleaning and preserving ocean ecosystems through community participation.",
    status: "live",
    targetAmount: 60000000,
    raisedAmount: 30000000,
    contributionTokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    impactTokenAddress: "0x4567890123456789012345678901234567890123",
    projectDetails: JSON.stringify({
      impactTarget: "Remove 500 tons of plastic from oceans",
      financialProjection: "175% ROI in 30 months",
      nonProfitMandate: "Marine conservation cooperative",
    }),
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop",
  },
];

try {
  for (const project of sampleProjects) {
    await connection.execute(
      `INSERT INTO projects (name, description, status, targetAmount, raisedAmount, contributionTokenAddress, impactTokenAddress, projectDetails, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project.name,
        project.description,
        project.status,
        project.targetAmount,
        project.raisedAmount,
        project.contributionTokenAddress,
        project.impactTokenAddress,
        project.projectDetails,
        project.imageUrl,
      ]
    );
  }
  console.log("Database seeded successfully!");
} catch (error) {
  console.error("Error seeding database:", error);
} finally {
  await connection.end();
}
