import Filter from '@/components/features/home-page/Filter';

export default function SearchBar(props: { setProduct: Function }) {
  return (
    <>
      <Filter setProduct={props.setProduct} />
      <input
        data-testid="search-input"
        className="mt-[4rem] h-[45px] w-[31.5rem] bg-gray-50 pr-[8rem]"
        name="search"
        placeholder="  Search a product"
      />
      <button
        type="submit"
        className="mt-[4rem] h-[45px] w-[3rem] rounded bg-[#AC64C2] pl-[0.4rem] text-sm font-medium text-white"
      >
        <svg
          aria-hidden="true"
          className="h-8 w-8 pl-1"
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
