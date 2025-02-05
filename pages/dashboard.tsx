import { GetServerSideProps } from "next";
import LineChartWidget from "@/components/lineChartWidget";
import PieChartWidget from "@/components/pieChartWidget";

interface MonthlySummary {
  _id: string;
  date: string;
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
  topCategory: string;
  customerSatisfaction: number;
  newCustomers: number;
  returnRate: number;
}

interface DashboardProps {
  data: MonthlySummary[];
}

function getMonthFromString(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "short" });
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // TODO: If we decide to let the user interact with the data,
  // like filtering or sorting, switch to using `useState`
  // Or, if data processing is heavy, `useMemo` (only re-runs when
  // data changes)
  let salesData = data.map((item) => {
    return {
      month: getMonthFromString(item.date),
      totalSales: item.totalSales,
    };
  });

  let orderData = data.map((item) => {
    return {
      month: getMonthFromString(item.date),
      orderCount: item.orderCount,
    };
  });

  let newCustomerData = data.map((item) => {
    return {
      month: getMonthFromString(item.date),
      newCustomers: item.newCustomers,
    };
  });

  let countByCategory = data.reduce((acc, obj) => {
    acc[obj.topCategory] = (acc[obj.topCategory] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  let countByCategoryData = Object.entries(countByCategory).map(
    ([key, value]) => ({
      name: key,
      value: value,
    })
  );

  return (
    <main className="relative flex place-items-center gap-6 before:absolute flex-col items-center justify-between mt-8 p-6 ${inter.className} before:absolute before:h-[600px] before:w-[960px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[700px] after:w-[1200px] after:translate-x-1/8 after:bg-gradient-conic after:from-sky-600 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-400 before:dark:opacity-20 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-30 before:lg:h-[360px]">
      <h1 className="pb-4 text-4xl">Dashboard</h1>
      <div className="relative w-screen flex gap-4 px-8 grid gid-cols-1 lg-grid-cols-2 xl:grid-cols-3">
        <LineChartWidget
          title="Total Sales"
          data={salesData}
          xKey="month"
          yKey="totalSales"
          lineColor="#22c55e"
        />
        <LineChartWidget
          title="Order Count"
          data={orderData}
          xKey="month"
          yKey="orderCount"
          lineColor="#00a7b9"
        />
        <LineChartWidget
          title="# New Customers"
          data={newCustomerData}
          xKey="month"
          yKey="newCustomers"
          lineColor="#0079d3"
        />
        <PieChartWidget title="Top Categories" data={countByCategoryData} />
      </div>
    </main>
  );
};

export default Dashboard;

// NextJS calls this automatically when we land on this page
// and passes the results as props to the component
export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = context.req.headers.host;
  const apiUrl = `${protocol}://${host}/api/dashboard`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
