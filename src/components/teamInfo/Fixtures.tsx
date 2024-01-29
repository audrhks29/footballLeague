import { memo } from 'react';

interface Props {
  data: ResultType[];
}

const Fixtures = memo(({ data }: Props) => {
  console.log(data);
  return (
    <div>

    </div>
  );
});

export default Fixtures;