import { Form, Modal } from "react-bootstrap";
import CustomButton from "../../Buttons/CustomButton/CustomButton.tsx";
import "./SettingsModal.css";
import { MouseEventHandler } from "react";

export default function SettingsModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void | MouseEventHandler;
}) {
  return (
    <Modal
      data-bs-theme="dark"
      size="lg"
      className="text-white overflow-auto"
      backdrop="static"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header
        closeButton
        className="border-0 d-flex justify-content-center"
      ></Modal.Header>
      <Modal.Body className="px-2 px-sm-3">
        <Modal.Title className=" text-center fs-1 fw-bold">
          Ustawienia
        </Modal.Title>
        <Form>
          <div className="my-4  mx-sm-2 m-md-4 p-3 rounded-2 bg-body-secondary">
            <ul className="list-unstyled d-flex flex-column gap-4">
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10 align-items-center">
                Pokaż koordynaty{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  aria-label="Pokaż koordynaty"
                />
              </li>
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10 align-items-center">
                Graj Dźwięk{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  aria-label="Graj Dźwięk"
                />
              </li>
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10 align-items-center">
                Podświetl pionki z dostępnym ruchem{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  aria-label="Podświetl pionki z dostępnym ruchem"
                />
              </li>
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10 align-items-center">
                Pokaż ostatni ruch{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  aria-label="Pokaż ostatni ruch"
                />
              </li>
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10 align-items-center">
                Pokaż dostępne ruchy dla zaznaczonego pionka{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  aria-label="Pokaż dostępne ruchy dla zaznaczonego pionka"
                />
              </li>
            </ul>
          </div>
          <div className="my-4 mx-2 m-md-4  d-flex gap-5 justify-content-end fs-sm-8 fs-xsm-9 fs-xxs-10 align-items-center">
            <CustomButton
              text="Anuluj"
              type="button"
              className="py-2 px-3 settings-modal-button"
              onClick={handleClose}
              variant="neutral"
            />
            <CustomButton
              text="Zapisz"
              type="submit"
              className="py-2 px-3 settings-modal-button"
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
