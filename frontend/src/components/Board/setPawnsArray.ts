import { CHANGE_PAWNS_POSITIONS } from "../../utils/ActionTypes";

export function setPawnsArray(dispatch: Function): void {
	const pawns = [];
	for (let rows = 1; rows < 9; rows++) {
		for (let cols = 1; cols < 9; cols++) {
			const squareKey = rows.toString() + cols.toString();
			const baseClassName =
				"square-" +
				parseInt(rows.toString() + cols.toString()) +
				" position-absolute bg-transparent square";
			if ((rows + cols) % 2 == 0 && (rows < 4 || rows > 5)) {
				pawns.push({
					tabIndex: 0,
					dataRow: rows,
					dataCol: cols,
					key: squareKey,
					className:
						baseClassName +
						" z-1 pawn " +
						(rows < 4 ? "blue-pawn" : "red-pawn"),
				});
			}
		}
	}
	dispatch({ type: CHANGE_PAWNS_POSITIONS, newPawnsPositions: pawns });
}
