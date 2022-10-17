import style from "./styles.module.scss";

export function LoadingSpinner() {
  const { spinnerContainer, loadingSpinner } = style;
  return (
    <div className={spinnerContainer}>
      <span className={loadingSpinner} />
    </div>
  );
}
