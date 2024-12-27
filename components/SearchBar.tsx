import React from 'react';
import { useState } from 'react';
import { SearchBar } from '@rneui/base';
import Colours from '@/constants/Colors';
import { useHomeApiContext } from "@/contexts/HomeApiProvider";


// https://reactnativeelements.com/docs/components/searchbar

export default function MySearchBar() {
    const apiContext = useHomeApiContext();
    const search = apiContext.search;
    const setSearch = apiContext.setSearch;

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
        backgroundColor: Colours.y4,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchInput: {
        backgroundColor: Colours.y3,
        borderRadius: 30,
    },
}