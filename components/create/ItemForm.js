/**
 * Project: Tokenward Mobile-Client
 * File: /components/ItemForm.js
 * Description: Form component for different item types.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

// React/React-Native Imports
import React from 'react';
import { View } from 'react-native';

// Custom Component Imports
import InputBox from '../InputBox';
import Dropdown from '../Dropdown';

export default function ItemForm({
    type,
    title,
    content,
    tags,
    folders,
    setTitle,
    setContent,
    setSelectedTag,
    setSelectedFolder,
    selectedTag,
    selectedFolder
}) {
    return (
        <View>
            {(type === 'passwordToken' || type === 'folder' || type === 'tag') && (
                <InputBox label="Name" value={title} onChangeText={setTitle} />
            )}
            {type === 'passwordToken' && (
                <>
                    <InputBox label="Content" value={content} onChangeText={setContent} />
                    <Dropdown label="Select Tag" data={tags} onSelect={setSelectedTag} value={selectedTag} />
                    <Dropdown label="Select Folder" data={folders} onSelect={setSelectedFolder} value={selectedFolder} />
                </>
            )}
        </View>
    );
}
