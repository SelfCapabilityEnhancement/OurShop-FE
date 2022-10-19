export function TextSubmission(props: {
  value: string;
  handleEdit: Function;
  handleCancel: Function;
  handleSave: Function;
}) {
  return (
    <div className="flex flex-col justify-items-center h-[480px]">
      <textarea
        className="address-input appearance-none border border-gray-300 mx-8 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Enter your shipping address"
        name="shippingAddress"
        value={props.value}
        onChange={(event) => props.handleEdit(event)}
        rows={5}
        cols={30}
      ></textarea>
      <div className="mb-5 flex justify-around mt-60">
        <button
          type="button"
          onClick={() => props.handleCancel()}
          className="button cancel w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-gray-400 hover:bg-gray-600 "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => props.handleSave()}
          className="button save w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 "
        >
          Save
        </button>
      </div>
    </div>
  );
}
