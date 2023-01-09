export default function HLine({ text }: { text: string }) {
  return (
    <div className="relative mx-5 flex items-center">
      <div className="flex-grow border-t-2 border-gray-400"></div>
      <span className="mx-3 flex-shrink text-2xl">{text}</span>
      <div className="flex-grow border-t-2 border-gray-400"></div>
    </div>
  );
}
