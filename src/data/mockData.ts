export interface Venue {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    sport: 'Padel' | 'Tennis' | 'Badminton';
    image: string;
}

export const venues: Venue[] = [
    {
        id: '1',
        name: 'Elite Padel Club',
        location: '2.3 km',
        rating: 4.8,
        reviews: 234,
        price: 150000,
        sport: 'Padel',
        image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: '2',
        name: 'Metropolitan Tennis Center',
        location: '3.7 km',
        rating: 4.9,
        reviews: 412,
        price: 180000,
        sport: 'Tennis',
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: '3',
        name: 'Urban Badminton Arena',
        location: '1.5 km',
        rating: 4.7,
        reviews: 189,
        price: 80000,
        sport: 'Badminton',
        image: 'https://images.unsplash.com/photo-1626224583764-847890e0b1bd?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: '4',
        name: 'Riverside Padel Courts',
        location: '4.2 km',
        rating: 4.6,
        reviews: 156,
        price: 135000,
        sport: 'Padel',
        image: 'https://plus.unsplash.com/premium_photo-1676634832558-6654a134e920?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '5',
        name: 'Premier Tennis Academy',
        location: '5.1 km',
        rating: 5.0,
        reviews: 287,
        price: 200000,
        sport: 'Tennis',
        image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: '6',
        name: 'CityCenter Badminton Club',
        location: '0.8 km',
        rating: 4.5,
        reviews: 203,
        price: 75000,
        sport: 'Badminton',
        image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&q=80&w=1000',
    }
];

export interface Booking {
    id: string;
    venueId: string; // Added for navigation
    venueName: string;
    venueImage?: string;
    date: string;
    time: string;
    sport: string;
    status: 'Confirmed' | 'Completed' | 'Cancelled';
    price: number;
    location?: string;
    duration?: string;
}

export const bookings: Booking[] = [
    {
        id: 'BK001',
        venueId: '1', // Elite Padel Club
        venueName: 'Elite Padel Club',
        venueImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1000',
        date: '2025-12-10',
        time: '18:00',
        sport: 'Padel',
        status: 'Confirmed',
        price: 150000,
        location: '2.3 km • Downtown',
        duration: '1 hour'
    },
    {
        id: 'BK003',
        venueId: '3', // Urban Badminton Arena
        venueName: 'Urban Badminton Arena',
        venueImage: 'https://images.unsplash.com/photo-1626224583764-847890e0b1bd?auto=format&fit=crop&q=80&w=1000',
        date: '2025-12-08',
        time: '20:00',
        sport: 'Badminton',
        status: 'Confirmed',
        price: 85000,
        location: '1.5 km • West Side',
        duration: '1 hour'
    },
];

export const pastBookings: Booking[] = [
    {
        id: 'BK002',
        venueId: '2', // Metropolitan Tennis Center
        venueName: 'Metropolitan Tennis Center',
        venueImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1000',
        date: '2025-11-28',
        time: '15:00',
        sport: 'Tennis',
        status: 'Completed',
        price: 850000,
        location: '3.7 km • Uptown',
        duration: '2 hours'
    },
    {
        id: 'BK004',
        venueId: '5', // Premier Tennis Academy
        venueName: 'Premier Tennis Academy',
        venueImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=1000',
        date: '2025-11-15',
        time: '10:00',
        sport: 'Tennis',
        status: 'Completed',
        price: 1000000,
        location: '5.1 km • Suburbs',
        duration: '1.5 hours'
    },
];
