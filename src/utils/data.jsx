export const COUNTRY_CODES = [
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
];

export const designOptions = [
    {
        id: 'celebration',
        name: 'Celebration',
        emoji: '🎉',
        gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)'
    },
    {
        id: 'professional',
        name: 'Professional',
        emoji: '💼',
        gradient: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
    },
    {
        id: 'birthday',
        name: 'Birthday',
        emoji: '🎂',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
    },
    {
        id: 'thankyou',
        name: 'Thank You',
        emoji: '💝',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
    },
];