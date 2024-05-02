import Tooltip from "react-bootstrap/Tooltip";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MouseEventHandler } from "react";
import drawIcon from "../../../assets/draw_icon.svg";

export default function GameManageButton({
  tooltipPlacement,
  tooltipText,
  icon,
  disabled = false,
  onClick,
}: {
  tooltipPlacement: "top" | "bottom";
  tooltipText: string;
  icon: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}) {
  return (
    <OverlayTrigger
      placement={tooltipPlacement}
      delay={{ show: 100, hide: 200 }}
      overlay={
        <Tooltip className="position-absolute" id={"1"}>
          {tooltipText}
        </Tooltip>
      }
    >
      <Button
        variant={"secondary"}
        className=" px-4 py-0 rounded-2 border-0 "
        disabled={disabled}
        onClick={onClick}
      >
        {icon === "bi-draw" ? (
          <img src={drawIcon} alt="drawSvg" />
        ) : (
          <i className={"bi " + icon + " fs-4 "}></i>
        )}
      </Button>
    </OverlayTrigger>
  );
}
