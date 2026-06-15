// Major Money Quest — 50-level curriculum.
// Each level has a lesson + 3 multiple-choice questions.
// NOTE: In source data the correct choice is always index 0 ("A").
// The runtime shuffles choices before rendering so order is randomized.

export type Question = {
  prompt: string;
  choices: string[]; // index 0 is the correct answer in source data
  correctIndex: number; // 0 in source; shuffled at runtime
  feedback: string;
};

export type Level = {
  id: number; // 1..50
  world: number; // 1..10
  levelInWorld: number; // 1..5
  title: string;
  lesson: string;
  questions: Question[];
};

export type World = {
  number: number;
  title: string;
  subtitle: string;
};

export const worlds: World[] = [
  { number: 1, title: "Money Foundations", subtitle: "The building blocks of every decision" },
  { number: 2, title: "Budgeting Basics", subtitle: "Give every dollar a job" },
  { number: 3, title: "Saving & Goals", subtitle: "Plan ahead, sleep easy" },
  { number: 4, title: "Banking", subtitle: "How accounts really work" },
  { number: 5, title: "Credit", subtitle: "Borrowing power, used wisely" },
  { number: 6, title: "Debt & Loans", subtitle: "Climb out, stay out" },
  { number: 7, title: "Investing", subtitle: "Make your money work" },
  { number: 8, title: "Taxes & Paychecks", subtitle: "Understand your take-home" },
  { number: 9, title: "Consumer Protection", subtitle: "Spot scams, stay safe" },
  { number: 10, title: "Real-World Money", subtitle: "Decisions that shape your future" },
];

// Helper to build a question with correct answer first.
const q = (prompt: string, choices: [string, string, string, string], feedback: string): Question => ({
  prompt,
  choices,
  correctIndex: 0,
  feedback,
});

export const levels: Level[] = [
  // ---------- WORLD 1: MONEY FOUNDATIONS ----------
  {
    id: 1, world: 1, levelInWorld: 1, title: "What Money Does",
    lesson: "Money is a tool for trading, saving, measuring value, and making choices. Financial literacy means knowing how to use money instead of letting money control you.",
    questions: [
      q("What is one main purpose of money?", ["To trade for goods and services", "To guarantee happiness", "To avoid all work", "To replace education"], "Money helps people exchange value for goods and services."),
      q("What does financial literacy mean?", ["Knowing how to make smart money choices", "Having the most money", "Never spending money", "Only investing in stocks"], "Financial literacy is about understanding money decisions."),
      q("Why is money called a tool?", ["Because how you use it matters", "Because it always grows by itself", "Because it removes risk", "Because it is only for adults"], "Money is useful when used with planning and judgment."),
    ],
  },
  {
    id: 2, world: 1, levelInWorld: 2, title: "Income",
    lesson: "Income is money you receive. It can come from jobs, businesses, investments, gifts, or side projects. Different types of income can be active or passive.",
    questions: [
      q("What is income?", ["Money you receive", "Money you owe", "Money you lose", "Money you borrow"], "Income is money coming in."),
      q("Which is an example of active income?", ["Getting paid for working a shift", "Interest from a savings account", "A stock dividend", "A gift card"], "Active income usually comes from work you directly perform."),
      q("Why is income important in a budget?", ["It sets the limit for what you can spend and save", "It makes debt disappear", "It replaces taxes", "It guarantees wealth"], "A budget starts with knowing how much money comes in."),
    ],
  },
  {
    id: 3, world: 1, levelInWorld: 3, title: "Expenses",
    lesson: "Expenses are money going out. They can be fixed, like rent or subscriptions, or variable, like food, shopping, and entertainment.",
    questions: [
      q("What is an expense?", ["Money you spend", "Money you earn", "Money you invest", "Money you receive as a gift"], "Expenses are money leaving your account."),
      q("Which is usually a fixed expense?", ["Monthly phone bill", "Random snack purchase", "Movie ticket", "Birthday gift"], "Fixed expenses are usually predictable."),
      q("Why should you track expenses?", ["To see where your money goes", "To spend more freely", "To avoid earning income", "To remove all bills"], "Tracking expenses helps you make better choices."),
    ],
  },
  {
    id: 4, world: 1, levelInWorld: 4, title: "Needs vs. Wants",
    lesson: "Needs are things required for basic living, like food, housing, transportation, and medicine. Wants improve life but are not required.",
    questions: [
      q("Which is usually a need?", ["Groceries", "Designer sneakers", "Concert tickets", "Gaming skin"], "Food is a basic need."),
      q("Which is usually a want?", ["Streaming subscription", "Medication", "Rent", "Bus fare to school"], "Entertainment subscriptions are usually wants."),
      q("Why does the difference matter?", ["It helps prioritize spending", "It makes wants bad", "It removes fun", "It makes budgets unnecessary"], "Knowing needs vs. wants helps you spend intentionally."),
    ],
  },
  {
    id: 5, world: 1, levelInWorld: 5, title: "Opportunity Cost",
    lesson: "Opportunity cost is what you give up when you choose one option over another. Every money choice has a tradeoff.",
    questions: [
      q("What is opportunity cost?", ["The next-best thing you give up", "The price tag only", "Free money", "A tax refund"], "Opportunity cost is the value of the choice you did not take."),
      q("If you spend $30 on food delivery, what might be the opportunity cost?", ["Saving that $30 instead", "Getting free groceries", "Paying no taxes", "Increasing your income automatically"], "The money could have gone toward another goal."),
      q("Why is opportunity cost useful?", ["It helps compare choices", "It makes every choice wrong", "It eliminates risk", "It tells you never to spend"], "It helps you think beyond the immediate purchase."),
    ],
  },

  // ---------- WORLD 2: BUDGETING BASICS ----------
  {
    id: 6, world: 2, levelInWorld: 1, title: "Budgeting 101",
    lesson: "A budget is a plan for your money. It helps you decide how much to spend, save, give, invest, or use to pay debt.",
    questions: [
      q("What is a budget?", ["A plan for money", "A loan", "A credit score", "A tax form"], "A budget gives money a job."),
      q("What should a budget compare?", ["Income and expenses", "Height and weight", "Likes and dislikes", "Cash and coins only"], "Budgeting starts by comparing money in and money out."),
      q("What is a good budget supposed to do?", ["Help you make intentional choices", "Stop all spending", "Guarantee wealth overnight", "Replace income"], "Budgets guide your decisions."),
    ],
  },
  {
    id: 7, world: 2, levelInWorld: 2, title: "50/30/20 Rule",
    lesson: "The 50/30/20 rule is a simple budgeting method: 50% for needs, 30% for wants, and 20% for savings or debt repayment.",
    questions: [
      q("In the 50/30/20 rule, what does 50% usually cover?", ["Needs", "Wants", "Investing only", "Taxes only"], "The largest category usually covers essentials."),
      q("What does the 20% category include?", ["Savings and debt repayment", "Only shopping", "Only food", "Only rent"], "The 20% category builds future stability."),
      q("Is the 50/30/20 rule perfect for everyone?", ["No, it is a flexible guide", "Yes, it always works exactly", "No one should use it", "It only works for millionaires"], "It is a starting point, not a law."),
    ],
  },
  {
    id: 8, world: 2, levelInWorld: 3, title: "Zero-Based Budget",
    lesson: "A zero-based budget means every dollar gets assigned a job. Income minus planned spending, saving, giving, investing, and debt payments equals zero.",
    questions: [
      q("What does zero-based budgeting mean?", ["Every dollar is assigned", "You have zero money", "You cannot spend anything", "You only use cash"], "Zero-based budgeting gives every dollar a purpose."),
      q("If income is $500, total planned uses should equal:", ["$500", "$0", "$250", "$1,000"], "The goal is to assign all income."),
      q("Why can zero-based budgeting help?", ["It reduces unplanned spending", "It removes bills", "It guarantees high income", "It avoids tracking"], "Planning each dollar can reduce waste."),
    ],
  },
  {
    id: 9, world: 2, levelInWorld: 4, title: "Tracking Spending",
    lesson: "Tracking spending means recording purchases so you can spot patterns. Small purchases can become big expenses over time.",
    questions: [
      q("Why track spending?", ["To understand habits", "To make money vanish", "To avoid saving", "To increase prices"], "Tracking reveals where your money really goes."),
      q("Which purchase can add up over time?", ["Daily $6 drink", "Free library book", "Walking outside", "Drinking water"], "Frequent small purchases can become large monthly totals."),
      q("What tool can help track spending?", ["Notes app or spreadsheet", "A movie ticket", "A random receipt pile only", "Ignoring bank statements"], "Simple tools can help you track clearly."),
    ],
  },
  {
    id: 10, world: 2, levelInWorld: 5, title: "Budget Checkup",
    lesson: "A budget is not one-time. Review it often, especially when income, expenses, goals, or responsibilities change.",
    questions: [
      q("When should you update a budget?", ["When income or expenses change", "Never", "Only after retirement", "Only when you are rich"], "Budgets should adjust with real life."),
      q("What does a budget checkup look for?", ["Overspending and progress", "Hair color", "Weather only", "Random guesses"], "Checkups help you improve decisions."),
      q("Why do budgets fail sometimes?", ["They are unrealistic or not reviewed", "Saving exists", "Income exists", "Math exists"], "A budget should be realistic and updated."),
    ],
  },

  // ---------- WORLD 3: SAVING & GOALS ----------
  {
    id: 11, world: 3, levelInWorld: 1, title: "Pay Yourself First",
    lesson: "Paying yourself first means saving money before spending on wants. Even small automatic savings can build discipline.",
    questions: [
      q("What does 'pay yourself first' mean?", ["Save before spending on wants", "Buy everything first", "Avoid all bills", "Spend your savings first"], "Saving first makes goals a priority."),
      q("Why automate savings?", ["It makes saving consistent", "It increases prices", "It removes income", "It creates debt"], "Automation reduces the chance you forget."),
      q("Which is an example?", ["Put $20 into savings when paid", "Spend first and hope money is left", "Ignore your account", "Borrow for wants"], "Setting aside savings early helps build habits."),
    ],
  },
  {
    id: 12, world: 3, levelInWorld: 2, title: "Emergency Fund",
    lesson: "An emergency fund is money saved for unexpected costs like repairs, medical bills, or job loss. It protects you from relying on debt.",
    questions: [
      q("What is an emergency fund for?", ["Unexpected necessary costs", "Random shopping", "Luxury trips only", "Gambling"], "Emergency funds protect you during surprises."),
      q("Why is an emergency fund useful?", ["It can prevent high-interest debt", "It eliminates all problems", "It makes spending unlimited", "It replaces insurance completely"], "Savings can reduce the need to borrow."),
      q("Where should emergency money usually be?", ["Safe and accessible account", "Risky meme stock only", "Hidden in an online game", "Locked away forever"], "Emergency money should be easy to access."),
    ],
  },
  {
    id: 13, world: 3, levelInWorld: 3, title: "Short-Term Goals",
    lesson: "Short-term goals are things you plan to afford soon, such as school supplies, a phone repair, or an event. Clear goals need amount, deadline, and plan.",
    questions: [
      q("What makes a goal clear?", ["Amount, deadline, and plan", "Vague hope", "Random spending", "No timeline"], "Specific goals are easier to reach."),
      q("Which is a short-term goal?", ["Save $120 in 2 months", "Retire in 40 years", "Buy a house someday", "Build a huge portfolio over decades"], "Short-term goals are usually within months or a year."),
      q("Why set short-term goals?", ["They make saving more focused", "They remove all needs", "They guarantee discounts", "They replace income"], "A goal gives saving a reason."),
    ],
  },
  {
    id: 14, world: 3, levelInWorld: 4, title: "Sinking Funds",
    lesson: "A sinking fund is money saved gradually for a known future expense, like car repairs, gifts, school fees, or travel.",
    questions: [
      q("What is a sinking fund?", ["Savings for a planned future expense", "Money lost forever", "A credit card fee", "A type of tax"], "Sinking funds prepare for known costs."),
      q("Which is a good sinking fund category?", ["Holiday gifts", "Unknown lottery winnings", "Free air", "Random debt"], "Gifts are predictable future expenses."),
      q("Why use sinking funds?", ["To avoid being surprised by expected costs", "To avoid planning", "To spend without limits", "To lower income"], "Saving gradually makes big costs easier."),
    ],
  },
  {
    id: 15, world: 3, levelInWorld: 5, title: "Saving vs. Hoarding",
    lesson: "Saving is purposeful. Hoarding money out of fear can stop you from investing in needs, growth, or meaningful experiences.",
    questions: [
      q("What makes saving healthy?", ["It connects to goals and security", "It is based only on fear", "It avoids all spending forever", "It ignores needs"], "Good saving supports a plan."),
      q("When can saving become unhealthy?", ["When fear blocks necessary spending", "When it helps emergencies", "When it funds goals", "When it avoids debt"], "Money should serve your life, not control it."),
      q("What is balanced money behavior?", ["Save, spend, give, and invest intentionally", "Never spend", "Always spend", "Ignore choices"], "Balance is the key."),
    ],
  },

  // ---------- WORLD 4: BANKING ----------
  {
    id: 16, world: 4, levelInWorld: 1, title: "Checking Accounts",
    lesson: "A checking account is used for everyday spending, deposits, bill payments, and debit card transactions.",
    questions: [
      q("What is a checking account mainly for?", ["Everyday transactions", "Long-term investing only", "Stock trading only", "Avoiding all payments"], "Checking accounts are for regular money movement."),
      q("What can a debit card connect to?", ["Checking account", "Credit score only", "Loan application only", "Tax return only"], "Debit cards often spend from checking."),
      q("Why monitor checking?", ["To avoid overdrafts and errors", "To increase fees", "To hide spending", "To remove budgeting"], "Monitoring protects your money."),
    ],
  },
  {
    id: 17, world: 4, levelInWorld: 2, title: "Savings Accounts",
    lesson: "A savings account is for storing money safely while sometimes earning interest. It is usually less risky than investing.",
    questions: [
      q("What is a savings account used for?", ["Holding money safely", "Borrowing instantly", "Paying credit interest", "Avoiding all goals"], "Savings accounts help store money securely."),
      q("What can savings accounts earn?", ["Interest", "Credit card debt", "Late fees automatically", "Parking tickets"], "Some savings accounts pay interest."),
      q("Why separate savings from checking?", ["It reduces accidental spending", "It makes money disappear", "It increases taxes always", "It removes goals"], "Separation helps protect savings."),
    ],
  },
  {
    id: 18, world: 4, levelInWorld: 3, title: "Interest",
    lesson: "Interest is money paid for using money. You can earn interest on savings or pay interest on debt.",
    questions: [
      q("Interest can be:", ["Earned or paid", "Only illegal", "Only free", "Only for adults over 65"], "Interest works both ways."),
      q("Who pays interest on a loan?", ["The borrower", "The person receiving a gift", "The store only", "The school principal"], "Borrowers pay interest to lenders."),
      q("Why compare interest rates?", ["Rates affect how much you earn or owe", "Rates do not matter", "Higher debt is always better", "It replaces income"], "Interest rate differences can become expensive."),
    ],
  },
  {
    id: 19, world: 4, levelInWorld: 4, title: "Fees",
    lesson: "Bank fees may include overdraft fees, ATM fees, monthly fees, or late fees. Reading account terms helps avoid surprises.",
    questions: [
      q("What is an overdraft fee?", ["A fee for spending more than available", "Free savings", "Investment profit", "A paycheck bonus"], "Overdrafts can happen when your balance goes below zero."),
      q("How can you avoid many fees?", ["Read terms and monitor balances", "Ignore statements", "Spend randomly", "Use only guesses"], "Awareness helps prevent fees."),
      q("Which is a possible bank fee?", ["ATM fee", "Homework fee", "Walking fee", "Breathing fee"], "Some ATMs charge fees."),
    ],
  },
  {
    id: 20, world: 4, levelInWorld: 5, title: "Credit Unions vs. Banks",
    lesson: "Banks are for-profit institutions. Credit unions are member-owned nonprofits. Both may offer checking, savings, loans, and cards.",
    questions: [
      q("Credit unions are usually:", ["Member-owned nonprofits", "Always online games", "Stock exchanges", "Tax agencies"], "Credit unions are owned by members."),
      q("Banks are usually:", ["For-profit institutions", "Charities only", "Schools only", "Government exams"], "Many banks operate for profit."),
      q("Why compare both?", ["Fees, rates, access, and services differ", "They are always identical", "Neither handles money", "Comparing is illegal"], "Comparing helps you choose the best fit."),
    ],
  },

  // ---------- WORLD 5: CREDIT ----------
  {
    id: 21, world: 5, levelInWorld: 1, title: "What Credit Means",
    lesson: "Credit means borrowing money with a promise to repay. Good credit habits can help with loans, housing, and lower interest rates.",
    questions: [
      q("What is credit?", ["Borrowing with a promise to repay", "Free money", "A gift", "A type of income"], "Credit must be repaid."),
      q("Why does credit matter?", ["It can affect borrowing and housing", "It guarantees wealth", "It removes all bills", "It replaces budgeting"], "Credit history can affect future opportunities."),
      q("What is a key credit habit?", ["Pay on time", "Always miss payments", "Max every card", "Ignore statements"], "On-time payments are very important."),
    ],
  },
  {
    id: 22, world: 5, levelInWorld: 2, title: "Credit Cards",
    lesson: "A credit card lets you borrow up to a limit. If you do not pay the full balance, interest can make purchases much more expensive.",
    questions: [
      q("A credit card is:", ["Borrowed money", "Your paycheck", "A debit card always", "A savings account"], "Credit card spending is borrowing."),
      q("What happens if you carry a balance?", ["You may pay interest", "The purchase becomes free", "Your limit disappears forever", "Taxes vanish"], "Carrying balances can be costly."),
      q("Best habit with credit cards?", ["Pay the full statement balance on time", "Pay late often", "Spend to the limit", "Ignore APR"], "Paying in full avoids interest."),
    ],
  },
  {
    id: 23, world: 5, levelInWorld: 3, title: "APR",
    lesson: "APR stands for annual percentage rate. It shows the yearly cost of borrowing. High APR debt can grow quickly.",
    questions: [
      q("What does APR measure?", ["Yearly cost of borrowing", "Your grade level", "Your savings goal", "Your paycheck"], "APR helps compare borrowing costs."),
      q("Which APR is usually better for a loan?", ["Lower APR", "Higher APR", "Random APR", "Hidden APR"], "Lower APR usually means lower borrowing cost."),
      q("Why is credit card APR risky?", ["It can make unpaid balances grow fast", "It guarantees profit", "It deletes debt", "It creates free rewards"], "High interest can become expensive."),
    ],
  },
  {
    id: 24, world: 5, levelInWorld: 4, title: "Credit Scores",
    lesson: "A credit score estimates how risky it is to lend to someone. Payment history, amounts owed, credit age, new credit, and credit mix can affect it.",
    questions: [
      q("What does a credit score estimate?", ["Credit risk", "Intelligence", "Personality", "Income exactly"], "It estimates lending risk."),
      q("What usually helps a credit score?", ["Paying on time", "Missing payments", "Maxing cards", "Ignoring bills"], "Payment history matters a lot."),
      q("What can hurt credit?", ["Late payments", "Responsible usage", "Low balances", "Checking your budget"], "Late payments can damage credit history."),
    ],
  },
  {
    id: 25, world: 5, levelInWorld: 5, title: "Credit Utilization",
    lesson: "Credit utilization is how much of your available credit you use. Lower utilization usually looks better to lenders.",
    questions: [
      q("What is credit utilization?", ["Percent of available credit used", "Total cash income", "Number of jobs", "Tax rate"], "It compares card balance to credit limit."),
      q("If your limit is $1,000 and balance is $900, utilization is:", ["90%", "9%", "10%", "900%"], "$900 divided by $1,000 is 90%."),
      q("Why keep utilization low?", ["It can support healthier credit", "It increases fees always", "It makes debt free", "It removes interest rates"], "Lower utilization often looks less risky."),
    ],
  },

  // ---------- WORLD 6: DEBT & LOANS ----------
  {
    id: 26, world: 6, levelInWorld: 1, title: "Good Debt vs. Bad Debt",
    lesson: "Debt is not automatically good or bad. It depends on purpose, cost, risk, and whether it helps create long-term value.",
    questions: [
      q("Debt should be judged by:", ["Purpose, cost, and risk", "Color of the card", "Logo design", "Random chance only"], "Debt decisions require context."),
      q("Which debt may build value if affordable?", ["Education or business loan", "High-interest shopping debt", "Payday loan for wants", "Random impulse debt"], "Some debt can support future income."),
      q("What makes debt dangerous?", ["High interest and no repayment plan", "Understanding the terms", "Comparing rates", "Paying on time"], "Expensive debt can trap people."),
    ],
  },
  {
    id: 27, world: 6, levelInWorld: 2, title: "Loan Principal",
    lesson: "Principal is the original amount borrowed. Interest is charged based on the principal and loan terms.",
    questions: [
      q("What is principal?", ["Original amount borrowed", "School leader only", "Interest fee", "Credit score"], "Principal is the base loan amount."),
      q("If you borrow $500, the principal starts at:", ["$500", "$50", "$5,000", "$0"], "Principal is what you borrowed."),
      q("Why does principal matter?", ["It affects interest cost", "It removes repayment", "It creates free money", "It replaces income"], "Larger principal can mean more interest."),
    ],
  },
  {
    id: 28, world: 6, levelInWorld: 3, title: "Minimum Payments",
    lesson: "Minimum payments are the smallest amount due, but paying only the minimum can keep you in debt longer and increase interest costs.",
    questions: [
      q("What is a minimum payment?", ["Smallest required payment", "Full payoff always", "A free reward", "A tax refund"], "Minimum payment keeps account current but may not save money."),
      q("Why can minimum payments be risky?", ["Debt lasts longer and interest grows", "They erase interest", "They double income", "They remove APR"], "Paying only the minimum can be expensive."),
      q("What is better when possible?", ["Pay more than minimum", "Pay nothing", "Ignore the bill", "Borrow more immediately"], "Extra payments reduce debt faster."),
    ],
  },
  {
    id: 29, world: 6, levelInWorld: 4, title: "Student Loans",
    lesson: "Student loans help pay for education but must be repaid with interest. Compare total cost, future earnings, grants, scholarships, and repayment options.",
    questions: [
      q("Student loans are:", ["Borrowed money for education", "Free scholarships", "Gifts always", "Income"], "Loans must be repaid."),
      q("What should students compare?", ["Cost, aid, future income, and repayment", "Mascot only", "Campus food only", "Dorm color only"], "College money decisions need full cost awareness."),
      q("Which aid does not usually need repayment?", ["Scholarship", "Loan", "Credit card", "Payday advance"], "Scholarships are usually gift aid."),
    ],
  },
  {
    id: 30, world: 6, levelInWorld: 5, title: "Debt Payoff Methods",
    lesson: "The snowball method pays smallest debts first for motivation. The avalanche method pays highest-interest debts first to save more money.",
    questions: [
      q("Snowball method focuses on:", ["Smallest balance first", "Highest APR first", "Random debt", "No debt"], "Snowball builds momentum."),
      q("Avalanche method focuses on:", ["Highest interest rate first", "Lowest balance first", "Newest card design", "Oldest receipt"], "Avalanche can save interest."),
      q("Which method is best?", ["The one you can stick with", "Always random", "Never pay debt", "Only borrow more"], "Consistency matters."),
    ],
  },

  // ---------- WORLD 7: INVESTING ----------
  {
    id: 31, world: 7, levelInWorld: 1, title: "Investing Basics",
    lesson: "Investing means putting money into assets with the hope of growth over time. Investing has risk, but it can help build wealth.",
    questions: [
      q("What is investing?", ["Buying assets for potential growth", "Guaranteed free money", "Hiding cash", "Avoiding all risk"], "Investing involves potential reward and risk."),
      q("Why invest long term?", ["Growth can compound over time", "Prices never change", "Risk disappears fully", "Taxes vanish"], "Time can help investments grow."),
      q("What should investors understand?", ["Risk and return", "Only hype", "Only logos", "Nothing"], "Investing requires informed decisions."),
    ],
  },
  {
    id: 32, world: 7, levelInWorld: 2, title: "Risk and Return",
    lesson: "Higher potential returns usually come with higher risk. Safer options often have lower expected returns.",
    questions: [
      q("Risk means:", ["Possibility of losing value", "Guaranteed profit", "No uncertainty", "Free income"], "Investments can go down."),
      q("Higher return usually means:", ["Higher risk", "No risk", "Guaranteed savings", "Lower uncertainty always"], "Risk and return are connected."),
      q("Why diversify?", ["To avoid depending on one investment", "To buy only one stock", "To guarantee profit", "To avoid research"], "Diversification spreads risk."),
    ],
  },
  {
    id: 33, world: 7, levelInWorld: 3, title: "Compound Growth",
    lesson: "Compounding happens when money earns returns, and those returns earn more returns. Time is powerful.",
    questions: [
      q("What is compounding?", ["Returns earning more returns", "Spending all income", "Borrowing forever", "Avoiding savings"], "Compounding builds on itself."),
      q("Why start early?", ["More time for growth", "Less time for growth", "It avoids all risk", "It skips taxes always"], "Time helps compounding."),
      q("What helps compounding?", ["Consistent investing", "Panic selling always", "Ignoring fees", "Chasing every trend"], "Consistency supports long-term growth."),
    ],
  },
  {
    id: 34, world: 7, levelInWorld: 4, title: "Stocks and Bonds",
    lesson: "Stocks represent ownership in a company. Bonds are loans to companies or governments. They have different risks and rewards.",
    questions: [
      q("A stock represents:", ["Ownership share", "A loan you owe", "A bank fee", "A tax form"], "Stocks are ownership pieces."),
      q("A bond is generally:", ["A loan to an organization", "Company ownership", "A debit card", "A subscription"], "Bond investors lend money."),
      q("Why own both?", ["They behave differently", "They are identical", "Both guarantee huge returns", "Neither has risk"], "Different assets can balance a portfolio."),
    ],
  },
  {
    id: 35, world: 7, levelInWorld: 5, title: "Index Funds",
    lesson: "An index fund holds many investments that track a market index. It can offer diversification at low cost.",
    questions: [
      q("What does an index fund usually hold?", ["Many investments", "One snack", "One receipt", "Only cash under a bed"], "Index funds can spread investment exposure."),
      q("Why do people like index funds?", ["Diversification and often low fees", "Guaranteed no losses", "Hidden debt", "No market changes"], "Low-cost diversification is useful."),
      q("Does an index fund still have risk?", ["Yes, market value can fall", "No, never", "Only on weekends", "Only for adults"], "Diversification reduces some risk but not all risk."),
    ],
  },

  // ---------- WORLD 8: TAXES & PAYCHECKS ----------
  {
    id: 36, world: 8, levelInWorld: 1, title: "Gross vs. Net Pay",
    lesson: "Gross pay is what you earn before deductions. Net pay is what you take home after taxes and deductions.",
    questions: [
      q("Gross pay means:", ["Before deductions", "After deductions", "Only cash tips", "Savings only"], "Gross pay is the starting amount."),
      q("Net pay means:", ["Take-home pay", "Total before taxes", "Credit limit", "Loan principal"], "Net pay is what you actually receive."),
      q("Why budget with net pay?", ["It is the money available to spend/save", "It is always higher", "It ignores taxes", "It removes bills"], "Your budget should use actual take-home money."),
    ],
  },
  {
    id: 37, world: 8, levelInWorld: 2, title: "Paycheck Deductions",
    lesson: "Paycheck deductions may include federal taxes, state taxes, Social Security, Medicare, benefits, or retirement contributions.",
    questions: [
      q("What is a paycheck deduction?", ["Money taken out before take-home pay", "Extra gift always", "Credit card limit", "Investment profit only"], "Deductions reduce gross pay to net pay."),
      q("Which can be a deduction?", ["Taxes", "Favorite song", "Shoe size", "Video game level"], "Taxes are common deductions."),
      q("Why read pay stubs?", ["To understand where money went", "To avoid knowing income", "To increase fees", "To remove work hours"], "Pay stubs explain your pay."),
    ],
  },
  {
    id: 38, world: 8, levelInWorld: 3, title: "Tax Forms",
    lesson: "Tax forms report income and taxes. W-2 forms are often for employees. 1099 forms often report non-employee or freelance income.",
    questions: [
      q("A W-2 is usually for:", ["Employees", "Only banks", "Only landlords", "Only investors"], "Employers often issue W-2s to employees."),
      q("A 1099 often reports:", ["Freelance or non-employee income", "School lunch", "Credit score", "Shoe purchases"], "1099s often show independent income."),
      q("Why keep tax forms?", ["They help file taxes accurately", "They replace income", "They avoid all taxes", "They are coupons"], "Tax forms document income."),
    ],
  },
  {
    id: 39, world: 8, levelInWorld: 4, title: "Filing Taxes",
    lesson: "Filing taxes means reporting income, deductions, and credits to calculate whether you owe money or get a refund.",
    questions: [
      q("What does filing taxes do?", ["Reports income and calculates tax result", "Creates free money always", "Removes income", "Cancels all debt"], "Filing determines taxes owed or refunded."),
      q("A refund means:", ["You paid more than required during the year", "Free government bonus always", "You never paid taxes", "Your income doubled"], "Refunds often come from overpayment."),
      q("Why file accurately?", ["To avoid errors and penalties", "To hide income", "To guess randomly", "To skip forms"], "Accuracy matters."),
    ],
  },
  {
    id: 40, world: 8, levelInWorld: 5, title: "Side Hustle Taxes",
    lesson: "Side hustle income may be taxable. Freelancers may need to set aside money for taxes because taxes may not be withheld automatically.",
    questions: [
      q("Is side hustle income possibly taxable?", ["Yes, often", "No, never", "Only if paid in coins", "Only if under $1"], "Many types of income must be reported."),
      q("Why save part of side hustle income?", ["Taxes may not be withheld", "It becomes illegal to save", "It removes expenses", "It guarantees profit"], "Setting aside tax money prevents surprises."),
      q("What should a side hustler track?", ["Income and expenses", "Only favorite colors", "Random guesses", "Nothing"], "Records help with taxes and planning."),
    ],
  },

  // ---------- WORLD 9: CONSUMER PROTECTION ----------
  {
    id: 41, world: 9, levelInWorld: 1, title: "Scams",
    lesson: "Scams trick people into giving money or personal information. Pressure, secrecy, unrealistic promises, and urgent threats are warning signs.",
    questions: [
      q("Which is a scam warning sign?", ["Urgent pressure to pay now", "Clear written terms", "Verified source", "Time to think"], "Scammers often pressure victims."),
      q("What should you do before paying?", ["Verify the source", "Rush immediately", "Share passwords", "Ignore red flags"], "Verification protects you."),
      q("Which promise is suspicious?", ["Guaranteed huge return with no risk", "Clear refund policy", "Normal receipt", "Official school invoice"], "Guaranteed high returns are a red flag."),
    ],
  },
  {
    id: 42, world: 9, levelInWorld: 2, title: "Identity Theft",
    lesson: "Identity theft happens when someone uses your personal information without permission. Protect passwords, Social Security numbers, and financial accounts.",
    questions: [
      q("Identity theft means:", ["Someone uses your personal info without permission", "Forgetting your username", "Changing your outfit", "Losing a pencil"], "Identity theft is misuse of personal information."),
      q("Which should you protect carefully?", ["Social Security number", "Favorite color only", "Public weather report", "School mascot"], "Sensitive identifiers need protection."),
      q("What helps protect accounts?", ["Strong unique passwords", "Reusing easy passwords", "Sharing logins", "Posting codes online"], "Strong passwords reduce risk."),
    ],
  },
  {
    id: 43, world: 9, levelInWorld: 3, title: "Subscription Traps",
    lesson: "Subscriptions can silently drain money. Free trials may turn into paid plans. Track renewal dates and cancel what you do not use.",
    questions: [
      q("Why are free trials risky?", ["They can become paid subscriptions", "They always stay free", "They erase debt", "They increase income"], "Trials often convert to paid plans."),
      q("What should you track?", ["Renewal dates", "Random ads", "Weather", "Shoe size"], "Renewal dates prevent surprise charges."),
      q("What should you cancel?", ["Services you do not use", "Rent", "Taxes", "Emergency savings"], "Unused subscriptions waste money."),
    ],
  },
  {
    id: 44, world: 9, levelInWorld: 4, title: "Smart Shopping",
    lesson: "Smart shopping means comparing price, quality, need, timing, and total cost. A discount is not savings if you did not need the item.",
    questions: [
      q("A sale is only useful if:", ["The purchase fits your need and budget", "The tag is red", "You buy immediately", "You borrow for it"], "Discounts can still lead to overspending."),
      q("What is total cost?", ["Price plus fees, shipping, taxes, and maintenance", "Sticker price only always", "Your income", "Your savings account"], "Total cost includes more than the listed price."),
      q("Why compare options?", ["To make a better value decision", "To waste time only", "To guarantee free items", "To avoid budgeting"], "Comparison helps you choose wisely."),
    ],
  },
  {
    id: 45, world: 9, levelInWorld: 5, title: "Refunds and Warranties",
    lesson: "Refund policies and warranties explain what happens if a product breaks or you change your mind. Read terms before buying expensive items.",
    questions: [
      q("What does a refund policy explain?", ["Whether/how you can return an item", "Your credit score", "Your paycheck", "Your tax bracket"], "Refund policies set return rules."),
      q("What does a warranty usually cover?", ["Certain defects or repairs", "All bad choices", "Every accident always", "Unlimited free upgrades"], "Warranties have limits."),
      q("Why read terms first?", ["To avoid surprises", "To spend faster", "To ignore costs", "To remove taxes"], "Terms affect your rights as a buyer."),
    ],
  },

  // ---------- WORLD 10: REAL-WORLD MONEY DECISIONS ----------
  {
    id: 46, world: 10, levelInWorld: 1, title: "Inflation",
    lesson: "Inflation means prices rise over time, reducing purchasing power. If income does not grow with prices, people can afford less.",
    questions: [
      q("Inflation means:", ["Prices rise over time", "Prices always fall", "Money disappears physically", "Taxes end"], "Inflation reduces buying power."),
      q("Purchasing power means:", ["What your money can buy", "Your physical strength", "Your credit card color", "Your tax form"], "Inflation affects what money can purchase."),
      q("If prices rise faster than income:", ["Life feels more expensive", "Everything becomes free", "Debt disappears", "Savings always doubles"], "Rising costs can squeeze budgets."),
    ],
  },
  {
    id: 47, world: 10, levelInWorld: 2, title: "College ROI",
    lesson: "College ROI means comparing education costs with future benefits like earnings, career options, networks, and personal goals.",
    questions: [
      q("ROI means:", ["Return on investment", "Random online income", "Rate of inflation only", "Rent owed instantly"], "ROI compares costs and benefits."),
      q("What should college ROI include?", ["Cost, aid, debt, earnings, and goals", "Mascot only", "Weather only", "Dorm decorations only"], "College value is financial and personal."),
      q("Why compare net price?", ["It shows cost after aid", "It is always the sticker price", "It removes debt", "It skips scholarships"], "Net price is more realistic than sticker price."),
    ],
  },
  {
    id: 48, world: 10, levelInWorld: 3, title: "Buying a Car",
    lesson: "A car's cost includes price, insurance, gas, maintenance, registration, repairs, and financing. Monthly payment is not the full cost.",
    questions: [
      q("What is part of car ownership cost?", ["Insurance and maintenance", "Only paint color", "Only music volume", "Only seat fabric"], "Cars have ongoing costs."),
      q("Why is monthly payment misleading?", ["It ignores total cost and loan length", "It always shows everything", "It removes interest", "It means free car"], "Lower monthly payments can hide longer debt."),
      q("What should you compare before buying?", ["Total cost of ownership", "Only logo", "Only speed", "Only social media posts"], "Total cost matters most."),
    ],
  },
  {
    id: 49, world: 10, levelInWorld: 4, title: "Giving and Community",
    lesson: "Money can also support causes, family, and community. Giving should be planned so generosity stays sustainable.",
    questions: [
      q("Why budget for giving?", ["To be generous responsibly", "To remove all needs", "To avoid saving", "To spend randomly"], "Planned giving is sustainable."),
      q("What should you check before donating?", ["Organization credibility", "Logo color only", "Celebrity posts only", "Random links"], "Credibility protects your impact."),
      q("Giving is best when:", ["It fits your values and budget", "It creates debt pressure", "It is forced by scams", "It ignores your needs"], "Healthy giving is intentional."),
    ],
  },
  {
    id: 50, world: 10, levelInWorld: 5, title: "Financial Freedom",
    lesson: "Financial freedom means having more control, options, and security. It comes from habits: earning, budgeting, saving, investing, protecting yourself, and learning continuously.",
    questions: [
      q("Financial freedom means:", ["More control and options", "Never working or thinking", "Unlimited spending", "No responsibility"], "Freedom is about choices and stability."),
      q("Which habit supports financial freedom?", ["Spend less than you earn", "Ignore debt", "Chase scams", "Never save"], "Positive habits build options."),
      q("What is the final lesson of Major Money Quest?", ["Money is a tool for your future", "Money should control you", "Debt is always good", "Budgets are useless"], "The goal is to master money, not be mastered by it."),
    ],
  },
];

export const totalLevels = levels.length;

// Avatar icon ids — rendered with lucide icons in the UI.
export const avatarOptions = [
  { id: "coins", label: "Coins" },
  { id: "banknote", label: "Banknote" },
  { id: "piggy", label: "Piggy Bank" },
  { id: "card", label: "Credit Card" },
  { id: "trend", label: "Trend" },
  { id: "shield", label: "Shield" },
] as const;
export type AvatarId = (typeof avatarOptions)[number]["id"];

// Badge definitions. Awarded by `evaluateBadges` in gameProgress.ts.
export type BadgeId =
  | "first-mission"
  | "budget-builder"
  | "credit-climber"
  | "debt-destroyer"
  | "investment-rookie"
  | "tax-ready"
  | "scam-shield"
  | "inflation-fighter"
  | "saver-strong"
  | "major-money-master";

export const badges: { id: BadgeId; label: string; description: string }[] = [
  { id: "first-mission", label: "First Mission Complete", description: "Finish your first level." },
  { id: "budget-builder", label: "Budget Builder", description: "Complete World 2: Budgeting Basics." },
  { id: "saver-strong", label: "Saver Strong", description: "Complete World 3: Saving & Goals." },
  { id: "credit-climber", label: "Credit Climber", description: "Complete World 5: Credit." },
  { id: "debt-destroyer", label: "Debt Destroyer", description: "Complete World 6: Debt & Loans." },
  { id: "investment-rookie", label: "Investment Rookie", description: "Complete World 7: Investing." },
  { id: "tax-ready", label: "Tax Ready", description: "Complete World 8: Taxes & Paychecks." },
  { id: "scam-shield", label: "Scam Shield", description: "Complete World 9: Consumer Protection." },
  { id: "inflation-fighter", label: "Inflation Fighter", description: "Complete level 46 — Inflation." },
  { id: "major-money-master", label: "Major Money Master", description: "Finish all 50 levels." },
];
