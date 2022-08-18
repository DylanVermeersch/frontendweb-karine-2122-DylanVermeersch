import React from 'react'

function TopButtons({setQuery, setLoading}) {
    const cities = [
        {
            id: 1,
            title: 'New York'
        },
        {
            id: 2,
            title: 'Canberra'
        },
        {
            id: 3,
            title: 'Brugge'
        },
        {
            id: 4,
            title: 'Madrid'
        },
        {
            id: 5,
            title: 'Moscow'
        },
        
    ]

  return (
    <div className='flex items-center justify-around my-6'>
        {
            cities.map((city) => (
                <button data-cy='top_btn' key={city.id} 
                className='text-white text-lg font-medium'
                onClick = {() => {
                    setQuery({q: city.title});
                    setLoading(true);
                    }}>
                    {city.title}
                </button>
            ))
        }
    </div>
  )
}

export default TopButtons