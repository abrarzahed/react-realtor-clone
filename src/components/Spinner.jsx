import classes from "../styles/Spinner.module.css";
export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed inset-0 z-50">
      <div className={classes.loadingio_spinner_blocks_2y1nu6txkmy}>
        <div className={classes.ldio_j9zflcr7rx}>
          <div
            style={{ left: "38px", top: "38px", animationDelay: "0s" }}
          ></div>
          <div
            style={{ left: "80px", top: "38px", animationDelay: "0.125s" }}
          ></div>
          <div
            style={{ left: "122px", top: "38px", animationDelay: "0.25s" }}
          ></div>
          <div
            style={{ left: "38px", top: "80px", animationDelay: "0.875s" }}
          ></div>
          <div
            style={{ left: "122px", top: "80px", animationDelay: "0.375s" }}
          ></div>
          <div
            style={{ left: "38px", top: "122px", animationDelay: "0.75s" }}
          ></div>
          <div
            style={{ left: "80px", top: "122px", animationDelay: "0.625s" }}
          ></div>
          <div
            style={{ left: "122px", top: "122px", animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
