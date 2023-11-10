export const useGetDate = () => {
    const getDate = (givenDate, option) => {
        const date = new Date(givenDate);
        const year = date.getFullYear();

        // Array of month names
        const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()]; // Get the month name
        const day = date.getDate().toString().padStart(2, '0');
        if(option === 'MMDD')
            return `${month}, ${day}`

        return `${month}, ${day} ${year}`;
    };

    const getTime = (givenDate) => {
        const now = new Date(givenDate);
        const hours = now.getHours().toString().padStart(2,'0');
        const minutes = now.getMinutes().toString().padStart(2,'0');

        const time = `${hours}:${minutes}`;
        return time;
    }

    const getDayName = (givenDate) => {
        var date = new Date(givenDate);
        return date.toLocaleDateString('id-ID', { weekday: 'long' });
    }
    return {getDate, getTime, getDayName}
}