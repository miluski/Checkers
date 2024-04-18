import { Form, Modal } from "react-bootstrap";
import CustomButton from "../../Buttons/CustomButton/CustomButton.tsx";
import "./SettingsModal.css";
import "../../../utils/utils.css";

export default function SettingsModal({
  show,
  handleClose,
}: {
  show: any;
  handleClose: any;
}) {
  return (
    <Modal
      data-bs-theme="dark"
      size="lg"
      className="text-white"
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
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10">
                Pokaż koordynaty{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  style={{ transform: "scale(1.5)" }}
                  aria-label="Pokaż koordynaty"
                />
              </li>
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10">
                Graj Dźwięk{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  style={{ transform: "scale(1.5)" }}
                  aria-label="Graj Dźwięk"
                />
              </li>
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10">
                Podświetl pionki z dostępnym ruchem{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  style={{ transform: "scale(1.5)" }}
                  aria-label="Podświetl pionki z dostępnym ruchem"
                />
              </li>
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10">
                Pokaż ostatni ruch{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  style={{ transform: "scale(1.5)" }}
                  aria-label="Pokaż ostatni ruch"
                />
              </li>
              <li className="d-flex justify-content-between fs-5 fs-md-7 fs-sm-8 fs-xsm-9 fs-xxs-10">
                Pokaż dostępne ruchy dla zaznaczonego pionka{" "}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-inline"
                  style={{ transform: "scale(1.5)" }}
                  aria-label="Pokaż dostępne ruchy dla zaznaczonego pionka"
                />
              </li>
            </ul>
          </div>
          <div className="my-4 mx-2 m-md-4  d-flex gap-5 justify-content-end fs-sm-8 fs-xsm-9 fs-xxs-10">
            <CustomButton
              text="Anuluj"
              type="button"
              className="py-2 px-3"
              style={{ width: "30%" }}
              onClick={handleClose}
              variant="neutral"
            />
            <CustomButton
              text="Zapisz"
              type="submit"
              className="py-2 px-3"
              style={{ width: "30%" }}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
