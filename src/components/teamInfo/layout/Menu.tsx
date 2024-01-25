import { Dispatch, SetStateAction, memo } from 'react';

interface Props {
  setSelectedMenu: Dispatch<SetStateAction<number>>;
}

const Menu = memo(({ setSelectedMenu }: Props) => {
  const MenuArray = [
    { id: 1, text: "Home", value: 1 },
    { id: 2, text: "Squad", value: 2 },
    { id: 3, text: "Fixtures", value: 3 },
    { id: 4, text: "Result", value: 4 }
  ]

  const handleSelectedMenu = (value: number) => {
    setSelectedMenu(value);
  };

  return (
    <ul className='flex py-6'>
      {MenuArray.map(item => {
        return (
          <li
            className='px-4 py-1 cursor-pointer'
            key={item.id}
            data-value={item.value}
            onClick={() => handleSelectedMenu(item.value)}
          >{item.text}</li>
        );
      })}
    </ul>
  );
});

export default Menu;