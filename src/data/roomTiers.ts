export interface RoomTier {
  id: string;
  name: string;
  categoryBadge?: string;
  subtitle: string;
  price: number;
  priceFormatted: string;
  pricePeriod: string;
  features: string[];
  popular?: boolean;
  exclusive?: boolean;
}

export const ROOM_TIERS: RoomTier[] = [
  {
    id: 'lite',
    name: 'Nirvaana Lite',
    categoryBadge: 'Essential Tier',
    subtitle: 'Non-Attached Washroom',
    price: 18999,
    priceFormatted: '₹18,999',
    pricePeriod: '/ bed / month',
    features: [
      'Fully furnished room',
      'Air conditioning',
      'Study setup',
      'Shared / non-attached washroom',
      'Housekeeping',
    ],
  },
  {
    id: 'plus',
    name: 'Nirvaana Plus',
    categoryBadge: 'Balcony View',
    subtitle: 'Attached Balcony + Non-Attached Washroom',
    price: 22999,
    priceFormatted: '₹22,999',
    pricePeriod: '/ bed / month',
    features: [
      'Fully furnished room',
      'Attached private balcony',
      'Air conditioning',
      'Shared / non-attached washroom',
      'Housekeeping',
    ],
  },
  {
    id: 'prime',
    name: 'Nirvaana Prime',
    categoryBadge: 'Popular',
    subtitle: 'Attached Washroom + Balcony',
    price: 24999,
    priceFormatted: '₹24,999',
    pricePeriod: '/ bed / month',
    popular: true,
    features: [
      'Fully furnished room',
      'Attached washroom',
      'Attached balcony',
      'Air conditioning',
      'Housekeeping',
    ],
  },
  {
    id: 'elite',
    name: 'Nirvaana Elite',
    categoryBadge: 'Exclusive',
    subtitle: 'Master Bedroom + Attached Washroom',
    price: 25999,
    priceFormatted: '₹25,999',
    pricePeriod: '/ bed / month',
    exclusive: true,
    features: [
      'Master bedroom category',
      'Attached washroom',
      'Fully furnished',
      'Air conditioning',
      'Housekeeping',
    ],
  },
];

export interface RoomSelectOption {
  value: string;
  label: string;
  title: string;
  subtitle: string;
  price: string;
  badge?: string;
}

export const ROOM_TIER_SELECT_OPTIONS: RoomSelectOption[] = ROOM_TIERS.map((tier) => ({
  value: `${tier.name} — ${tier.subtitle} - ${tier.priceFormatted}`,
  label: `${tier.name}: ${tier.subtitle} - ${tier.priceFormatted}`,
  title: tier.name,
  subtitle: tier.subtitle,
  price: tier.priceFormatted,
  badge: tier.popular ? 'Popular' : tier.exclusive ? 'Exclusive' : undefined,
}));
