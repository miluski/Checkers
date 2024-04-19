import CustomNavbar from "../../components/CustomNavbar/CustomNavbar.tsx";
import drawSvg from "../../assets/draw_icon.svg";
import { Button, Table } from "react-bootstrap";
import "./GameAgainstBotView.css";
import bluePawn from "../../assets/blue-pawn.png";
import redPawn from "../../assets/red-pawn.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import computerSvg from "../../assets/computer.svg";
import nicola from "../../assets/nicola.png";
import pawnCollectedRed from "../../assets/pawn-colected-red.png";
import pawnCollectedBlue from "../../assets/pawn-colected-blue.png";

export default function GameAgainstBotView() {
  return (
    <div
      className="d-flex flex-column flex-lg-row justify-content-between"
      style={{ backgroundColor: "var(--clr-neutral-750)" }}
    >
      <CustomNavbar />
      <div
        style={{ backgroundColor: "var(--clr-neutral-750)" }}
        className="align-self-center d-flex flex-column align-self-center justify-content-center my-4 my-xl-0 text-white mx-5"
      >
        <div className="d-flex mb-4 w-100 justify-content-end">
          <span className="mt-1 me-3 mt-sm-2 ms-sm-4">
            Bot <span className="text-white-50">(Średnio zaawansowany)</span>
          </span>
          <div
            className="hexagon "
            style={{ backgroundColor: "var(--clr-red-450)" }}
          >
            <div
              className="hexagon p-3"
              style={{ scale: "80%", backgroundColor: "var(--color-grid)" }}
            >
              <img className="img-fluid" src={computerSvg} alt="" />
            </div>
          </div>
        </div>
        <div
          className=" xd  bg-white align-self-center border border-2 border-secondary fs-4 fs-xd"
          id="board-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gridTemplateRows: "repeat(10, 1fr)",
            backgroundColor: "var(--color-grid)",
          }}
        >
          <div></div>
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
          <div>E</div>
          <div>F</div>
          <div>G</div>
          <div>H</div>
          <div></div>
          <div>1</div>
          <div>1</div>
          <div>2</div>
          <div>2</div>
          <div>3</div>
          <div>3</div>
          <div>4</div>
          <div>4</div>
          <div>5</div>
          <div>5</div>
          <div>6</div>
          <div>6</div>
          <div>7</div>
          <div>7</div>
          <div>8</div>
          <div>8</div>
          <div></div>
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
          <div>E</div>
          <div>F</div>
          <div>G</div>
          <div>H</div>
          <div></div>
          <div
            className="border border-2 border-secondary"
            id="container-inner"
            style={{
              gridColumn: "2/10",
              gridRow: "2/10",
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gridTemplateRows: "repeat(8, 1fr)",
            }}
          >
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100  p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={redPawn} className="img-fluid" alt="" />
            </div>
            <div className="w-100 h-100 p-1"></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1"></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1"></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1"></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1"></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1"></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1"></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1"></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
            <div className="w-100 h-100 p-1">
              <img src={bluePawn} className="img-fluid" alt="" />
            </div>
            <div
              className="w-100 h-100 p-1"
              style={{ backgroundColor: "var(--nth-color)" }}
            ></div>
          </div>
        </div>
        <div className="mt-4 d-flex  justify-content-start  w-100">
          <div
            className="hexagon"
            style={{ backgroundColor: "var(--clr-sky-250)" }}
          >
            <div
              className="hexagon"
              style={{
                scale: "80%",
                background: `url(${nicola})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <span className="mt-1 ms-3 mt-sm-2 ms-sm-4 d-flex flex-column ">
            <span>
              Nicola Tesla <span className="text-white-50">(Ty)</span>
            </span>
          </span>
        </div>
      </div>
      <div
        className="px-2 px-sm-4 d-flex align-items-center vh-100  xd2  justify-content-center "
        style={{ backgroundColor: "var(--clr-neutral-700)" }}
      >
        <div
          className="d-flex flex-column w-100  h-75  rounded-1 text-white border border-2 border-secondary position-relative "
          style={{
            backgroundColor: "var(--clr-neutral-750)",
            minWidth: "300px",
            maxWidth: "380px",
          }}
        >
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
            <div className="w-100 overflow-auto">
              <Table striped className="table-borderless ps-2" variant="dark">
                <tbody className="text-center 2  border-secondary ">
                  <tr>
                    <td style={{ width: "21.331%" }}>1.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div
            className="w-100  bottom-0 d-flex flex-wrap justify-content-evenly p-3 gap-4"
            style={{ backgroundColor: "var(--clr-neutral-800)" }}
          >
            <OverlayTrigger
              placement="top"
              delay={{ show: 100, hide: 200 }}
              overlay={<Tooltip id={"1"}>{"Nowa gra"}</Tooltip>}
            >
              <Button
                variant={"secondary"}
                className=" px-4 py-0 rounded-2 border-0 "
              >
                <i className="bi bi-arrow-clockwise fs-4"></i>
              </Button>
            </OverlayTrigger>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0 "
            >
              <i className="bi bi-chevron-left fs-4"></i>
            </Button>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0 "
            >
              <i className="bi bi-chevron-right fs-4 "></i>
            </Button>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0"
              disabled
            >
              <i className="bi bi-download fs-4 "></i>
            </Button>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0 "
              flex-1
            >
              <img src={drawSvg} alt="drawSvg" />
            </Button>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0 "
            >
              <i className="bi bi-flag-fill fs-4"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
