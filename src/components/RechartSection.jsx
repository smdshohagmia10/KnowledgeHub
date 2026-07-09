"use client"
import React from 'react';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
  Legend,
  Tooltip
} from 'recharts';

const COLORS = ['#10B981', '#F59E0B']; 
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null || percent === 0) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold tracking-wider">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  
  let fillOpacity;
  if (isAnyPieActive && !isThisPieActive) {
    fillOpacity = 0.5;
  } else {
    fillOpacity = 1;
  }
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      fillOpacity={fillOpacity}
      style={{ transition: 'fill-opacity 0.3s ease, transform 0.3s ease' }}
    />
  );
};

export default function RechartSection({ chartData = [], isAnimationActive = true }) {
  return (
    <div className="w-full max-w-[380px] mx-auto bg-content1 border border-default-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Pie
              data={chartData}
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive={isAnimationActive}
              shape={MyCustomPie}
              cx="50%"
              cy="50%"
              outerRadius="90%"
            />
            <Tooltip 
              cursor={false}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid var(--hn-default-200, rgba(128,128,128,0.15))',
                fontSize: '13px',
                fontWeight: '500',
                backgroundColor: 'hsl(var(--heroui-content1))',
                color: 'hsl(var(--heroui-foreground))',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }} 
              itemStyle={{
                color: 'hsl(var(--heroui-foreground-700))'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{
                fontSize: '12px',
                fontWeight: '600',
                paddingTop: '15px',
                color: 'hsl(var(--heroui-default-600))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}