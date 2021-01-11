export function randomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function sign(num: number) {
    if(num == 0) {
        return 0;
    }
    return num / Math.abs(num);
}