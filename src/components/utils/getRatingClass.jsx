
// border color replacement using css styles in the Сard
const getRatingClass = (rating) => {
    if (rating <= 3) return 'low-rating';
    if (rating <= 5) return 'medium-rating';
    if (rating <= 7) return 'high-rating';
    return 'top-rating';
};

export default getRatingClass;