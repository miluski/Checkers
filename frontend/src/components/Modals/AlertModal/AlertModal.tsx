import { Modal } from "react-bootstrap";
import CustomButton from "../../Buttons/CustomButton/CustomButton.tsx";
import { MouseEventHandler } from "react";
import "./AlertModal.css";

export default function AlertModal({
  show,
  icon,
  title,
  text,
  color,
  onProceed,
  onDismiss,
  onProceedButtonVariant,
  onDismissButtonVariant,
  onProceedButtonText,
  onDismissButtonText,
  backdrop = "static",
  onHide,
}: {
  show: boolean;
  icon: string;
  title: string;
  text?: string;
  color: string;
  onProceed: MouseEventHandler;
  onDismiss?: MouseEventHandler;
  onProceedButtonVariant?: "primary" | "secondary" | "success" | "neutral";
  onDismissButtonVariant?: "primary" | "secondary" | "success" | "neutral";
  onProceedButtonText?: string;
  onDismissButtonText?: string;
  backdrop?: "static" | true;
  onHide?: () => void;
}) {
  return (
    <Modal
      data-bs-theme="dark"
      show={show}
      className="text-white "
      centered
      backdrop={backdrop}
      onHide={onHide}
    >
      <Modal.Header className="position-relative d-flex justify-content-center border-0 p-5 pb-3 pb-md-5">
        <div
          className="position-absolute  rounded-circle  d-flex align-items-center justify-content-center alert-modal-icon-wrapper"
          style={{
            backgroundColor: color,
          }}
        >
          <i className={"bi " + icon}></i>
        </div>
      </Modal.Header>
      <Modal.Body className="my-4">
        <h2 className="fs-1 text-center fw-bold">{title}</h2>
        <p className="mt-3 fs-5 text-center">{text}</p>
        <div className="d-flex justify-content-between mt-4  pt-3 px-3 px-md-5">
          {onDismiss && (
            <CustomButton
              text={onDismissButtonText ?? "OK"}
              type={"button"}
              className="px-xl-4 py-2 fs-5 alert-modal-button"
              onClick={onDismiss}
              variant={onDismissButtonVariant}
            />
          )}
          <CustomButton
            text={onProceedButtonText ?? "OK"}
            type={"button"}
            className={
              "py-2 fs-5 alert-modal-button " +
              (!onDismiss ? "w-100" : "px-xl-4")
            }
            onClick={onProceed}
            variant={onProceedButtonVariant}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
