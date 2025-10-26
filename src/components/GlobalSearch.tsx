'use client';


  id: string;
  title: string;
  description: string;
}


  const [query, setQuery] = useState('');

  useEffect(() => {

        event.preventDefault();
      }
    };


  useEffect(() => {
    if (!open) return;



  return (
      <div
      >
        <input
          id="global-search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GlobalSearch;
