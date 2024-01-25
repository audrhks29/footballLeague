import { memo } from 'react';

interface Props {
  data: MatchResultType[];
}

const Fixtures = memo(({ data }: Props) => {
  console.log(data);
  return (
    <div>

    </div>
  );
});

export default Fixtures;