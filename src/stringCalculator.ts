export function add(numbers: string): number {
    if (numbers === '') {
        return 0;
    }

    let delimiter = /[\n,]/;
    if (numbers.startsWith('//')) {
        const delimiterMatch = numbers.match(/^\/\/\[?(.*?)\]?\n/);
        if (delimiterMatch) {
            delimiter = new RegExp(delimiterMatch[1].split('][').map(d => d.replace(/[[\]]/g, '\\$&')).join('|'));
            numbers = numbers.slice(delimiterMatch[0].length);
        }
    }

    const numArray = numbers.split(delimiter).map(num => parseInt(num, 10));

    const negatives = numArray.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return numArray.reduce((sum, num) => {
        if (num > 1000) {
            return sum;
        }
        return sum + num;
    }, 0);
}
