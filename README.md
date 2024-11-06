# ExpenseTracker

ExpenseTracker is a web application designed to help users manage and visualize their expenses on a daily, monthly, or yearly basis. With the ability to categorize expenses, users can track their spending habits and gain insights into their financial health. Each category is customizable with unique colors, allowing for a personalized and easy-to-understand expense breakdown. An interactive pie chart helps users analyze their spending across different categories.

</br>

## Features

- Daily, Monthly, Yearly Tracking: View expenses based on different time frames.
- Customizable Categories: Assign unique colors to categories for easy identification.
- Visual Expense Analysis: Use pie charts to analyze spending patterns across categories.
- Responsive and Interactive: Optimized for desktop and mobile devices.

</br>
</br>

![Screenshot from 2024-11-06 14-49-27](https://github.com/user-attachments/assets/80eb012b-7865-47ec-9268-c78c08e49962)


</br>

## Tech Stack

- Frontend: React
- Backend: Express
- Data Visualization: D3.js for interactive charts

</br>

# Installation
Clone the repository:
```
git clone https://github.com/maxcillius/ExpenseTracker.git
cd ExpenseTracker
```

Install dependencies for both frontend and backend:

## Frontend
```
cd Frontend
npm install
```

## Backend && Database
```
docker compose build --no-cache
docker compose up
```

> Do change the api end points to ```http://localhost:3000``` in the frontend

</br>

# Usage
- Add Expenses: Log expenses by category and time frame.
- View Analysis: Use the pie chart to see a breakdown of expenses.
- Filter by Time: Toggle between daily, monthly, and yearly views to focus on specific time periods.
