export type TimeRange = '7d' | '30d' | '90d' | '1y';

export type ViewMode = 'overview' | 'orders' | 'inventory' | 'customers' | 'operations';

export interface KPIMetric {
  id: string;
  category: string;
  label: string;
  value: string;
  rawValue: number;
  changePercent: number;
  isPositive: boolean;
  timeframeLabel: string;
  sparklineData: number[];
  unitPrefix?: string;
  unitSuffix?: string;
}

export interface RevenueDataPoint {
  date: string;
  timestamp: string;
  revenue: number;
  margin: number;
  orders: number;
  aov: number;
}

export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  total: number;
  itemsCount: number;
  status: 'Completed' | 'Processing' | 'Flagged' | 'Refunded';
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Klarna' | 'PayPal';
  channel: 'Direct Web' | 'Instagram Shop' | 'Wholesale' | 'Google Search';
  timestamp: string;
  dateFormatted: string;
  items: OrderItem[];
  shippingCity: string;
  country: string;
  riskScore: 'Low' | 'Medium' | 'High';
}

export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  stockLevel: number;
  reorderPoint: number;
  status: 'Healthy' | 'Low Stock' | 'Critical' | 'Overstocked';
  unitCost: number;
  retailPrice: number;
  marginPercent: number;
  turnoverDays: number;
  monthlyVelocity: number;
  lastRestocked: string;
}

export interface CustomerCohort {
  cohortMonth: string;
  totalCustomers: number;
  retentionRates: number[]; // month 0, 1, 2, 3, 4, 5
}

export interface TopCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  totalOrders: number;
  averageOrderValue: number;
  tier: 'VIP Platinum' | 'Gold Tier' | 'Regular' | 'New';
  lastOrderDate: string;
}

export interface ChannelPerformance {
  channel: string;
  sessions: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  cac: number;
  roas: number;
}

export interface GatewayHealth {
  name: string;
  status: 'Operational' | 'Degraded' | 'Incident';
  uptime99: number;
  avgLatencyMs: number;
  successRate: number;
}
