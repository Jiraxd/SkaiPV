export function FormatNumber(number: number){
    if (Math.abs(number) >= 1e9) {
        return (number / 1e9).toFixed(2) + 'B';
    } else if (Math.abs(number) >= 1e6) {
        return (number / 1e6).toFixed(2) + 'M';
    } else if (Math.abs(number) >= 1e3) {
        return (number / 1e3).toFixed(2) + 'K';
    } else {
        return number.toFixed(2);
    }
}