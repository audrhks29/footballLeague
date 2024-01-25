import { memo } from 'react';
import { Link } from 'react-router-dom';

const Header = memo(() => {
  return (
    <ul>
      <Link to="/standings"><li>standings</li></Link>
      <Link to="/news"><li>News</li></Link>
      <Link to="/teams"><li>Team</li></Link>
    </ul>
  );
});

export default Header;