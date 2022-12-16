import OfficeBox from '@/components/features/home-page/OfficeBox';
import './Filter.css';
import { useState } from 'react';
import { getProductsByOfficeIds } from '@/service';

function Filter(props: { setProduct: Function }) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  function getIsCheck(isCheckInBox: string[]) {
    // @ts-ignore
    setIsCheck(isCheckInBox);
  }

  const handleFilter = () => {
    setIsDropDown(!isDropDown);
    // @ts-ignore
    document.getElementById('dropDownContent').classList.toggle('show');
  };

  const handleApply = () => {
    if (isCheck.length === 0) {
      getProductsByOfficeIds([1, 2, 3, 4, 5, 6]).then((filterProduct) =>
        props.setProduct(filterProduct)
      );
      setIsApply(false);
    } else {
      showProductsAfterFilter();
      setIsApply(true);
    }
    handleFilter();
  };

  const showProductsAfterFilter = () => {
    getProductsByOfficeIds(isCheck).then((filterProduct) =>
      props.setProduct(filterProduct)
    );
  };

  return (
    <div>
      <div className="dropdown">
        <button
          onClick={handleFilter}
          className={isApply ? 'after-apply' : 'dropbtn'}
        >
          <svg
            className="arrow h-10 w-10"
            viewBox="0 0 24 24"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className="png"
              fill={isApply ? 'white' : 'rgb(217 217 217)'}
              d="M18 15l-6-6l-6 6h12"
              transform="rotate(180 12 12)"
            />
          </svg>
          Filters
        </button>
        <div id="dropDownContent" className="dropdown-content">
          <p className="my-[0.5rem] mx-[1rem] text-xl">Office</p>
          <OfficeBox getIsCheck={getIsCheck} />
          <button
            type="button"
            className="apply mt-[6.5rem] ml-[32rem] w-[8rem] p-2 h-[2.5rem] text-lg text-white font-semibold rounded-xl bg-[#7F62C3] "
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
