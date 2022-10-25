export default function Counter(props: {
  count: number;
  handlePlus: Function;
  handleMinus: Function;
}) {
  const { count, handlePlus, handleMinus } = props;

  return (
    <div className="flex items-center">
      <svg
        data-testid="svg-minus"
        onClick={() => handleMinus()}
        className="h-10 w-10"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="gray"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M18 15l-6-6l-6 6h12" transform="rotate(270 12 12)" />
      </svg>
      <span data-testid="num" className="text-3xl w-8 text-center">
        {count}
      </span>
      <svg
        data-testid="svg-plus"
        onClick={() => handlePlus()}
        className="h-10 w-10"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="gray"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M18 15l-6-6l-6 6h12" transform="rotate(90 12 12)" />
      </svg>
    </div>
  );
}
