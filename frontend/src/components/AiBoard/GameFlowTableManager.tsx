import { Table } from "react-bootstrap";
import GameManageButton from "../Buttons/GameManageButton/GameManageButton.tsx";
import "../GameFlowTableManager/GameFlowTableManager.css";

export default function GameFlowTableManager({
  moves,
  setOPenResetModal: setOpenResetModal,
}) {
  return (
    <aside className="px-2 px-sm-4 d-flex justify-content-center game-against-bot-aside  align-items-center py-xl-0">
      <div className="py-5 container-wrapper">
        <div className="d-flex flex-column w-100  rounded-1 text-white border border-2 border-secondary  game-against-bot-aside-table-container h-100">
          <div className="d-flex flex-column fw-bold w-100  flex-fill border-bottom border-2 border-secondary m-0 align-items-start overflow-hidden ">
            <Table striped className="table-borderless m-0" variant="dark">
              <thead className="text-center position-sticky top-0 border border-2 border-secondary border-top-0 border-start-0 border-end-0 ">
                <tr>
                  <th>Tura</th>
                  <th>Niebieskie</th>
                  <th>Czerwone</th>
                </tr>
              </thead>
            </Table>
            <div className="w-100 flex-fill overflow-auto">
              <Table striped className="table-borderless ps-2" variant="dark">
                <tbody className="text-center 2  border-secondary ">
                  {moves.map((move, index) => (
                    <tr key={index}>
                      <td className={"table-column"}>
                        {Math.ceil(index + 1)}.
                      </td>
                      <td className={"blue-move"}>{move.blue}</td>
                      <td>{move.red}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="w-100 bottom-0 d-flex flex-wrap justify-content-evenly p-3 gap-4 table-game-action-container">
            <GameManageButton
              tooltipPlacement="top"
              tooltipText="Nowa gra"
              icon="bi-arrow-clockwise"
              onClick={() => setOpenResetModal(true)}
            />
            <GameManageButton
              tooltipPlacement="top"
              tooltipText="Poprzedni ruch"
              icon="bi-chevron-left"
              disabled
            />
            <GameManageButton
              tooltipPlacement="top"
              tooltipText="Następny ruch"
              icon="bi-chevron-right"
              disabled
            />
            <GameManageButton
              tooltipPlacement="bottom"
              tooltipText="Zapisz grę"
              icon="bi-download"
              disabled
            />
            <GameManageButton
              tooltipPlacement="bottom"
              tooltipText="Zaproponuj remis"
              icon="bi-draw"
              disabled
            />
            <GameManageButton
              tooltipPlacement="bottom"
              tooltipText="Poddaj grę"
              icon="bi-flag-fill"
              disabled
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
