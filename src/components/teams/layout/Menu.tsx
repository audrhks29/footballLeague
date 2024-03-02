import { Dispatch, SetStateAction, memo } from 'react';

interface Props {
  selectedMenu: number;
  setSelectedMenu: Dispatch<SetStateAction<number>>;
}

const Menu = memo(({ selectedMenu, setSelectedMenu }: Props) => {
  const MenuArray = [
    { id: 1, text: "Home", value: 1 },
    { id: 2, text: "Squad", value: 2 },
    { id: 3, text: "Result", value: 3 }
  ]

  const handleSelectedMenu = (value: number) => {
    setSelectedMenu(value);
  };

  return (
    <ul className='flex py-6'>
      {MenuArray.map(item => {
        return (
          <li
            className='w-[80px] px-4 py-1 cursor-pointer hover:font-bold'
            style={{
              textDecorationLine: `${selectedMenu}` === `${item.value}` ? "underline" : ""
            }}
            key={item.id}
            data-value={item.value}
            onClick={() => handleSelectedMenu(item.value)}
          >{item.text}</li>
        );
      })}
    </ul >
  );
});

export default Menu;