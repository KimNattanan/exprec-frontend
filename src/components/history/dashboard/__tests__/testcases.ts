import { DashboardData, Record } from "@/types/api";

export class TestcaseDashboardData {
  static getTest1()  {
    // ===== Realistic Test Case: Personal Expense Tracker ===== //

    const categories = [
      "Groceries",
      "Transportation",
      "Entertainment",
      "Utilities",
      "Dining Out",
      "Healthcare",
    ];

    const category_bg_color = [
      "#FF6B6B", // Groceries - warm coral red
      "#4ECDC4", // Transportation - teal
      "#5567FF", // Entertainment - royal blue
      "#FFD93D", // Utilities - bright yellow
      "#6BCB77", // Dining Out - green
      "#FF8C42", // Healthcare - orange
    ];

    let records: Record[] = [
      {
        id: "rec_001",
        note: "Weekly groceries from Costco",
        created_at: "2025-09-30",
        amount: 120.45,
        category: categories[0],
        category_bg_color: category_bg_color[0],
      },
      {
        id: "rec_002",
        note: "Bus pass recharge",
        created_at: "2025-09-15",
        amount: 50.0,
        category: categories[1],
        category_bg_color: category_bg_color[1],
      },
      {
        id: "rec_003",
        note: "Netflix subscription renewal",
        created_at: "2025-10-01",
        amount: 15.99,
        category: categories[2],
        category_bg_color: category_bg_color[2],
      },
      {
        id: "rec_004",
        note: "Electricity bill (September)",
        created_at: "2025-09-25",
        amount: 85.75,
        category: categories[3],
        category_bg_color: category_bg_color[3],
      },
      {
        id: "rec_005",
        note: "Dinner with friends",
        created_at: "2025-10-10",
        amount: 68.3,
        category: categories[4],
        category_bg_color: category_bg_color[4],
      },
      {
        id: "rec_006",
        note: "Prescription refill",
        created_at: "2025-08-20",
        amount: 34.2,
        category: categories[5],
        category_bg_color: category_bg_color[5],
      },
      {
        id: "rec_007",
        note: "Movie night",
        created_at: "2025-09-05",
        amount: 22.0,
        category: categories[2],
        category_bg_color: category_bg_color[2],
      },
      {
        id: "rec_008",
        note: "Uber ride to airport",
        created_at: "2025-09-18",
        amount: 42.5,
        category: categories[1],
        category_bg_color: category_bg_color[1],
      },
    ];

    // ======================== //

    records = records.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    let total_amount = 0;
    const amount_by_category = new Map<string, number>();
    const category_color = new Map<string, string>();
    records.forEach((record) => {
      total_amount += record.amount;
      amount_by_category.set(
        record.category,
        (amount_by_category.get(record.category) || 0) + record.amount
      );
      category_color.set(record.category, record.category_bg_color);
    });

    const dashboardData: DashboardData = {
      total_amount,
      amount_by_category,
      category_color,
      records,
    };
    return {dashboardData, categories};
  }

  static getTest2() {
    // ===== Realistic Test Case: Long-Term Personal Expense Dataset ===== //

    const categories = [
      "Groceries",
      "Transportation",
      "Entertainment",
      "Utilities",
      "Dining Out",
      "Healthcare",
      "Travel",
      "Subscriptions",
      "Shopping",
      "Miscellaneous",
    ];

    const category_bg_color = [
      "#FF6B6B", // Groceries - warm coral red
      "#4ECDC4", // Transportation - teal
      "#5567FF", // Entertainment - royal blue
      "#FFD93D", // Utilities - bright yellow
      "#6BCB77", // Dining Out - green
      "#FF8C42", // Healthcare - orange
      "#845EC2", // Travel - purple
      "#FF5E78", // Subscriptions - pink
      "#40A8C4", // Shopping - blue-cyan
      "#C34A36", // Miscellaneous - brick red
    ];

    const sampleNotes = [
      "Weekly groceries",
      "Dinner with friends",
      "Monthly Netflix bill",
      "Gym membership renewal",
      "Uber ride",
      "Coffee and snacks",
      "Electricity bill",
      "Flight ticket",
      "Weekend getaway",
      "Phone bill",
      "Movie tickets",
      "Gift purchase",
      "Online shopping",
      "Doctor appointment",
      "Medicine refill",
      "Subscription renewal",
      "Lunch meeting",
      "Car fuel",
      "Taxi fare",
      "Public transport pass",
    ];

    const randomDate = (start: Date, end: Date): string => {
      const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return date.toISOString().split("T")[0];
    };

    const randomAmount = (): number =>
      parseFloat((Math.random() * 200 + 10).toFixed(2)); // $10 - $210 range

    const records: Record[] = [];

    for (let i = 1; i <= 55; i++) {
      const idx = Math.floor(Math.random() * categories.length);
      const note = sampleNotes[Math.floor(Math.random() * sampleNotes.length)];
      records.push({
        id: `rec_${i.toString().padStart(3, "0")}`,
        note,
        created_at: randomDate(new Date("2023-01-01"), new Date("2025-12-31")),
        amount: randomAmount(),
        category: categories[idx],
        category_bg_color: category_bg_color[idx],
      });
    }

    // Sort by date ascending
    records.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // Calculate totals
    let total_amount = 0;
    const amount_by_category = new Map<string, number>();
    const category_color = new Map<string, string>();

    records.forEach((record) => {
      total_amount += record.amount;
      amount_by_category.set(
        record.category,
        (amount_by_category.get(record.category) || 0) + record.amount
      );
      category_color.set(record.category, record.category_bg_color);
    });

    const dashboardData: DashboardData = {
      total_amount,
      amount_by_category,
      category_color,
      records,
    };
    return {dashboardData, categories};
  }

  static getTest3() {
    const categories = ["Food", "Transportation", "Game"];
    const category_bg_color = [
      "#FF6B6B", // Food - coral red
      "#4ECDC4", // Transportation - teal
      "#5567FF", // Game - blue
    ];

    const records: Record[] = [];

    // Utility functions
    const randomAmount = (min: number, max: number) =>
      parseFloat((min + Math.random() * (max - min)).toFixed(2));

    const getDaysInMonth = (year: number, month: number) =>
      new Date(year, month + 1, 0).getDate();

    for (let month = 0; month < 12; month++) {
      const year = 2024;
      const days = getDaysInMonth(year, month);

      // ==== FOOD ====
      // Daily spending (3–4 meals, groceries, snacks)
      // → Averages around 300–400/day ≈ 9,000–12,000/month
      for (let d = 1; d <= days; d++) {
        const foodCost = randomAmount(280, 420);
        records.push({
          id: `food_${year}_${month + 1}_${d}`,
          note: "Meals, groceries, snacks",
          created_at: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
          amount: foodCost,
          category: categories[0],
          category_bg_color: category_bg_color[0],
        });
      }

      // ==== TRANSPORTATION ====
      // Weekdays only, but scaled up to reach 2,000–3,000/month
      // Adjust via multiplier trends
      let multiplier = 1;
      if (month < 3) multiplier = 1.0; // Jan–Mar normal
      else if (month < 6) multiplier = 2; // Apr–Jun longer commute
      else if (month < 9) multiplier = 0.4; // Jul–Sep remote work
      else multiplier = 1.2; // Oct–Dec job change farther away

      const weekdayCost = randomAmount(80, 130) * multiplier; // ≈ 100/day * 22 days = ~2200
      for (let d = 1; d <= days; d++) {
        const date = new Date(year, month, d);
        if (date.getDay() === 0 || date.getDay() === 6) continue; // Skip weekends
        records.push({
          id: `trans_${year}_${month + 1}_${d}`,
          note: "Commute, transport, ride-sharing",
          created_at: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
          amount: parseFloat(randomAmount(weekdayCost * 0.8, weekdayCost * 1.2).toFixed(2)),
          category: categories[1],
          category_bg_color: category_bg_color[1],
        });
      }

      // ==== GAME ====
      // Independent month-to-month — large swings
      const gameActivity = Math.random();

      if (gameActivity < 0.25) {
        // 25% → no gaming spend this month
        continue;
      } else if (gameActivity < 0.6) {
        // 35% → modest gaming spend (500–1200 total)
        const count = Math.floor(Math.random() * 2) + 1; // 1–3 purchases
        for (let i = 0; i < count; i++) {
          const day = Math.floor(Math.random() * days) + 1;
          records.push({
            id: `game_${year}_${month + 1}_${i}`,
            note: "Game purchase / DLC / microtransactions",
            created_at: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
            amount: randomAmount(150, 400),
            category: categories[2],
            category_bg_color: category_bg_color[2],
          });
        }
      } else {
        // 40% → major gaming month (1,000–2,000 total)
        const count = Math.floor(Math.random() * 7) + 2; // 2–5 purchases
        for (let i = 0; i < count; i++) {
          const day = Math.floor(Math.random() * days) + 1;
          records.push({
            id: `game_${year}_${month + 1}_${i}`,
            note: "New releases / console accessories",
            created_at: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
            amount: randomAmount(250, 600),
            category: categories[2],
            category_bg_color: category_bg_color[2],
          });
        }
      }
    }

    // Sort chronologically
    records.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // Aggregate
    let total_amount = 0;
    const amount_by_category = new Map<string, number>();
    const category_color = new Map<string, string>();

    records.forEach((r) => {
      total_amount += r.amount;
      amount_by_category.set(
        r.category,
        (amount_by_category.get(r.category) || 0) + r.amount
      );
      category_color.set(r.category, r.category_bg_color);
    });

    const dashboardData: DashboardData = {
      total_amount,
      amount_by_category,
      category_color,
      records,
    };
    return { dashboardData, categories };
  }
}