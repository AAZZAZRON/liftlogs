import React from 'react';
import { useState } from 'react';
import { SearchBar } from '@rneui/base';
import { View } from 'react-native';
import Colours from '@/constants/Colors';

// https://reactnativeelements.com/docs/components/searchbar

export default function MySearchBar() {
    const [search, setSearch] = React.useState('');

    const updateSearch = (search: string) => {
        setSearch(search);
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
        backgroundColor: Colours.dark4,
    },
    searchInput: {
        backgroundColor: Colours.dark3,
        borderRadius: 30,
    },
}