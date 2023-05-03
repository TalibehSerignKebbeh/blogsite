import React from 'react';
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>
  


const DashboardWrapper = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default DashboardWrapper;

{/* <div class="ls uh ym aqr"><img class="gs np rq uk adn" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt=""><h3 class="lf avv avz axq">Cody Fisher</h3><dl class="kp ls un ym za"><dt class="t">Title</dt><dd class="avv axm">Lead Security Associate</dd><dt class="t">Role</dt><dd class="la"><span class="lt yu adn ajc aqy ark avx avz axu bbo bbs bcn">Admin</span></dd></dl></div> */}
import { useState, useEffect, useTransition } from 'react';

function FilteredList({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000 // Set a timeout of 1 second
  });

  useEffect(() => {
    // Use startTransition to indicate that a transition is starting
    startTransition(() => {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  }, [items, searchTerm, startTransition]);

  return (
    <div>
      <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      {isPending ? 'Filtering...' : `Showing ${filteredItems.length} items`}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
