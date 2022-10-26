export default function HLine({ text }: { text: string }) {
  return (
    <div className="relative flex items-center mx-5">
      <div className="flex-grow border-t-2 border-gray-400"></div>
      <span className="flex-shrink mx-3 text-2xl">{text}</span>
      <div className="flex-grow border-t-2 border-gray-400"></div>
    </div>
  );
}
