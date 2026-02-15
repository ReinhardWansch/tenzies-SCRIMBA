
export function getTimeString(secondsMain) {
    let min = Math.floor(secondsMain / 60);
    let sec = secondsMain % 60;
    return min.toString().padStart(2,'0') + ':' + sec.toString().padStart(2,'0');
}