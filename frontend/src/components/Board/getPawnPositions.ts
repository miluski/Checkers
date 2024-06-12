import { Pawn } from "../../utils/types/Types";

export function getPawnPositions(): Array<Pawn> {
	const pawns = document.querySelectorAll(
		".blue-pawn, .red-pawn, .blue-pawn-king, .red-pawn-king"
	);
	const pawnPositions = Array.from(pawns).map((pawn: Pawn) => {
		const dataRow = pawn.getAttribute && pawn.getAttribute("data-row");
		const dataCol = pawn.getAttribute && pawn.getAttribute("data-col");
		return {
			tabIndex: 0,
			dataRow: parseInt(dataRow),
			dataCol: parseInt(dataCol),
			key: dataRow + dataCol,
			className: pawn.className,
		};
	});
	return pawnPositions;
}
