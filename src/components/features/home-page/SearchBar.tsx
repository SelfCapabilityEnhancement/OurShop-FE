import Filter from '@/components/features/home-page/Filter';

export default function SearchBar(props: { setProduct: Function }) {
  return (
    <>
      <Filter setProduct={props.setProduct} />
      <input
        className="bg-gray-50 mt-[4rem] pr-[8rem] h-[45px] w-[31.5rem]"
        name="search"
        placeholder="  Search a product"
      />
      <button
        type="submit"
        className="pl-[0.4rem] mt-[4rem] h-[45px] w-[3rem] text-sm font-medium text-white bg-[#AC64C2] rounded"
      >
        <svg
          aria-hidden="true"
          className="pl-1 w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </>
  );
}
