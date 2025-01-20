import { PieChart as PieIcon, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const categoryData = [
	{ name: "Electronics", value: 45600, growth: "+12.5%" },
	{ name: "Fashion", value: 38200, growth: "+8.2%" },
	{ name: "Home & Living", value: 29800, growth: "+15.7%" },
	{ name: "Sports", value: 18700, growth: "+5.3%" },
	{ name: "Books", value: 15400, growth: "+3.8%" }
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
	return (
		<div className="h-full p-4">
			{/* Header */}
			<div className="flex items-center justify-between mb-2 sm:mb-4 mt-4">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-purple-500/20 border border-indigo-500/20 shadow-lg shadow-indigo-500/10 backdrop-blur-xl">
							<PieIcon className="w-5 h-5 text-indigo-400" />
						</div>
						<div>
							<h3 className="text-sm sm:text-lg font-medium text-gray-100">
								Category Distribution
							</h3>
							<p className="text-xs sm:text-sm text-gray-400 mt-0.5">
								Sales distribution across categories
							</p>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
					<TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
					<span className="text-xs sm:text-sm font-medium">+8.4%</span>
				</div>
			</div>

			{/* Chart Container */}
			<div className="h-[calc(100%-72px)] sm:h-[calc(100%-100px)]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={categoryData}
							cx="50%"
							cy={window.innerWidth < 640 ? "45%" : "50%"}
							innerRadius={window.innerWidth < 640 ? "50%" : "60%"}
							outerRadius={window.innerWidth < 640 ? "70%" : "80%"}
							paddingAngle={5}
							dataKey="value"
						>
							{categoryData.map((entry, index) => (
								<Cell 
									key={`cell-${index}`} 
									fill={COLORS[index % COLORS.length]}
									className="hover:opacity-80 transition-opacity duration-200"
								/>
							))}
						</Pie>
						<Tooltip 
							contentStyle={{ 
								background: 'rgba(17, 24, 39, 0.95)',
								border: '1px solid rgba(75, 85, 99, 0.3)',
								borderRadius: '0.5rem',
								boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
							}}
							itemStyle={{ color: '#E5E7EB', fontSize: '12px' }}
						/>
						<Legend 
							verticalAlign="middle" 
							align="right"
							layout="vertical"
							wrapperStyle={{
								fontSize: '12px',
								paddingLeft: window.innerWidth < 640 ? '10px' : '20px'
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default CategoryDistributionChart;