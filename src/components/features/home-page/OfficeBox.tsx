import Checkbox from '@/components/features/home-page/CheckBox';
import { useEffect, useState } from 'react';
import { getAllOffices } from '@/service';

export default function OfficeBox(props: { getIsCheck: Function }) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<String[]>([]);
  const [officeList, setOfficeList] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const res = await getAllOffices();
      setOfficeList(
        res.map(({ id, office }) => ({ id: id.toString(), name: office }))
      );
    })();
  }, []);

  useEffect(() => props.getIsCheck(isCheck), [isCheck]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(officeList.map((i) => i.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  function checkOutASelectAllOrNot(checked: boolean, id: string) {
    if (isCheck.length < 7 && !checked) {
      setIsCheckAll(false);
      setIsCheck(isCheck.filter((i) => i !== id));
    } else if (isCheck.length === 5 && checked) {
      setIsCheckAll(true);
    }
  }

  const handleClick = (e: { target: { id: string; checked: boolean } }) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);

    checkOutASelectAllOrNot(checked, id);
  };

  const officeNames = officeList.map(({ id, name }) => {
    return (
      <Checkbox
        id={id}
        key={id}
        type="checkbox"
        name={name}
        handleClick={handleClick}
        isChecked={isCheck.includes(id)}
      >
        {name}
      </Checkbox>
    );
  });

  return (
    <div>
      {officeNames}
      <Checkbox
        id="selectAll"
        type="checkbox"
        name="selectAll"
        handleClick={handleSelectAll}
        isChecked={isCheckAll}
      >
        All
      </Checkbox>
    </div>
  );
}
