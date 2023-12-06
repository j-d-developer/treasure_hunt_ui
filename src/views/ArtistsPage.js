import React from 'react';

const ArtistsPage = () => {
    // Sample data for 8 artists
    const artists = Array(8).fill({
        image: '', // URL of the artist's image or empty for unrevealed artists
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur lorem.'
    });

    const placeholderImage = 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=?'; // Placeholder image URL

    return (
        <div className="container mx-auto p-4">
            {artists.map((artist, index) => (
                <div key={index} className="flex items-center bg-white shadow-lg rounded-lg my-4 mx-auto p-6" style={{ maxWidth: '800px' }}> {/* Set max-width for the artist box */}
                    <div className="flex-shrink-0">
                        <img
                            src={artist.image || placeholderImage}
                            alt={`Artist ${index + 1}`}
                            className="h-48 w-48 object-cover rounded-full"
                        />
                    </div>
                    <div className="ml-6 flex-grow"> {/* Allow text container to grow as needed */}
                        <p className="text-gray-600 text-lg leading-relaxed">{artist.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArtistsPage;
