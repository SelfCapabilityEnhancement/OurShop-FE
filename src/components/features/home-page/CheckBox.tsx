export default function Checkbox(props: {
  id: string;
  type: string;
  name: string;
  handleClick: Function;
  isChecked: boolean;
  children: string;
}) {
  const { id, type, name, handleClick, isChecked, children } = props;
  return (
    <>
      <label form={id} className="checkbox align-text-bottom">
        <input
          id={id}
          name={name}
          type={type}
          // @ts-ignore
          onChange={handleClick}
          checked={isChecked}
          className="mx-[0.5rem] h-[1.25rem] w-[1.25rem] bg-gray-100 align-text-bottom text-xl leading-loose accent-violet-600 focus:ring-violet-700"
        />
        {children}
      </label>
    </>
  );
}
