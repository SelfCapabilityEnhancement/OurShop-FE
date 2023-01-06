export function TextSubmission(props: {
  value: string;
  handleEdit: Function;
  handleCancel: Function;
  handleSave: Function;
}) {
  return (
    <div className="flex h-[480px] flex-col justify-items-center">
      <textarea
        className="address-input mx-8 appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
        placeholder="Enter your shipping address"
        name="shippingAddress"
        value={props.value}
        onChange={(event) => props.handleEdit(event)}
        rows={5}
        cols={30}
      ></textarea>
      <div className="mb-5 mt-60 flex justify-around">
        <button
          type="button"
          onClick={() => props.handleCancel()}
          className="button cancel h-12 w-1/4 rounded-lg bg-gray-400 p-3 text-lg font-semibold text-white hover:bg-gray-600 "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => props.handleSave()}
          className="button confirm h-12 w-1/4 rounded-lg bg-violet-500 p-3 text-lg font-semibold text-white hover:bg-violet-700 "
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
