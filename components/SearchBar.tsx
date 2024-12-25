import React from 'react';
import { useState } from 'react';
import { SearchBar } from '@rneui/base';
import Colours from '@/constants/Colors';
import { ExerciseObject } from '@/constants/types';

// https://reactnativeelements.com/docs/components/searchbar

export default function MySearchBar({data, setDatalist}: {data: ExerciseObject[], setDatalist: (data: any) => void}) {
    const [search, setSearch] = useState('');

    const updateSearch = (search: string) => {
        setSearch(search);
        var filteredData = data.filter((exercise) => search === '' || exercise.name.includes(search));
        setDatalist(filteredData);
    }

    return (
        <SearchBar 
            placeholder="Find Exercise..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
        />
    );
}

const styles: any = {
    searchContainer: {
        width: '100%',
        padding: 5,
        backgroundColor: Colours.y4,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchInput: {
        backgroundColor: Colours.y3,
        borderRadius: 30,
    },
}