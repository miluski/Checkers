export function getColRowDescription(pawnDiv: HTMLDivElement) {
    const col = pawnDiv.getAttribute("data-col");
    const colLetter = String.fromCharCode(Number(col) + 64);
    const row = pawnDiv.getAttribute("data-row");
    return colLetter + String(row);
}