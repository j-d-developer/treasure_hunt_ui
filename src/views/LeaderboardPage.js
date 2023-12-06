import React, { useState, useEffect, useMemo } from 'react';

const LeaderboardPage = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(100);
    const [searchTerm, setSearchTerm] = useState('');
    const [tokenIdSearch, setTokenIdSearch] = useState('');
    const [filter, setFilter] = useState('any');
    const [sortConfig, setSortConfig] = useState({ key: 'stagesComplete', direction: 'descending' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/nfts');
                const data = await response.json();
                setData(data.map(item => ({
                    tokenId: item.tokenId,
                    stagesComplete: Math.floor(Math.random() * 9),
                    holderAddress: item.ownerAddress
                })));
            } catch (error) {
                console.error('Error fetching NFT data from backend:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = data.filter(entry =>
            (tokenIdSearch === '' || entry.tokenId.toString().includes(tokenIdSearch)) &&
            (searchTerm === '' || entry.holderAddress.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filter === 'any' || entry.stagesComplete === Number(filter))
        );

        if (sortConfig !== null) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredData(filtered);
    }, [searchTerm, tokenIdSearch, filter, data, sortConfig]);

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = useMemo(() => filteredData.slice(indexOfFirstEntry, indexOfLastEntry), [filteredData, indexOfFirstEntry, indexOfLastEntry]);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const canGoBackward = currentPage > 1;
    const canGoForward = currentPage < totalPages;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
            <div className="flex flex-wrap items-center mb-4">
                <div className="relative mr-2 flex-grow">
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search by Holder Address"
                        onChange={e => setSearchTerm(e.target.value)}
                        className="border-2 border-gray-300 p-2 w-full"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute text-gray-600 text-lg inset-y-0 right-0 mr-3">
                            &times;
                        </button>
                    )}
                </div>
                <div className="relative mr-2 flex-grow">
                    <input
                        type="text"
                        value={tokenIdSearch}
                        placeholder="Search by Token ID"
                        onChange={e => setTokenIdSearch(e.target.value)}
                        className="border-2 border-gray-300 p-2 w-full"
                    />
                    {tokenIdSearch && (
                        <button onClick={() => setTokenIdSearch('')} className="absolute text-gray-600 text-lg inset-y-0 right-0 mr-3">
                            &times;
                        </button>
                    )}
                </div>
                <div className="flex-grow">
                    <label htmlFor="stages-filter" className="mr-2">Filter:</label>
                    <select id="stages-filter" onChange={e => setFilter(e.target.value)} className="border-2 border-gray-300 p-2">
                        <option value="any">Any</option>
                        {[...Array(9).keys()].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>
            </div>
            <table className="w-full text-left border-collapse border border-gray-400">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border-b-2 border-gray-300 py-4 px-6 cursor-pointer" onClick={() => requestSort('tokenId')}>Token ID</th>
                        <th className="border-b-2 border-gray-300 py-4 px-6 cursor-pointer" onClick={() => requestSort('stagesComplete')}>Stages Complete</th>
                        <th className="border-b-2 border-gray-300 py-4 px-6">Holder Address</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.map(entry => (
                        <tr key={entry.tokenId} className="hover:bg-gray-100">
                            <td className="border-b border-gray-300 py-4 px-6">{entry.tokenId}</td>
                            <td className="border-b border-gray-300 py-4 px-6">{entry.stagesComplete}</td>
                            <td className="border-b border-gray-300 py-4 px-6">{entry.holderAddress}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col items-center mt-4">
                <div className="flex">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={!canGoBackward}
                        className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 m-1 disabled:opacity-50"
                    >
                        &larr; Prev
                    </button>
                    {[...Array(totalPages).keys()].map(n => (
                        <button
                            key={n}
                            onClick={() => paginate(n + 1)}
                            className={`py-2 px-4 m-1 ${currentPage === n + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
                        >
                            {n + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={!canGoForward}
                        className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 m-1 disabled:opacity-50"
                    >
                        Next &rarr;
                    </button>
                </div>

                <span className="mt-2 text-sm">Page {currentPage} of {totalPages}</span>
            </div>
        </div>
    );
};

export default LeaderboardPage;
