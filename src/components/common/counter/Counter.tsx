export default function Counter(props: {count: number, handlePlus: Function, handleMinus: Function}) {
  const {count, handlePlus, handleMinus} = props;

  return (
    <div className="flex">
      <svg
        data-testid="svg-minus"
        onClick={() => handleMinus()}
        className="h-8 w-8"
        width="24"
        height="24"
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
      <span data-testid="num" className="text-2xl w-8 text-center">{count}</span>
      <svg
        data-testid="svg-plus"
        onClick={() => handlePlus()}
        className="h-8 w-8"
        width="24"
        height="24"
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
