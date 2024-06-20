import React from "react"
import { View } from "react-native"

import InputBox from "./essential/InputBox"
import Dropdown from "./essential/Dropdown"

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
            {(type === 'password' || type === 'folder' || type === 'tag') && (
                <InputBox label="Name" value={title} onChangeText={setTitle} />
            )}
            {type === 'password' && (
                <>
                    <InputBox label="Content" value={content} onChangeText={setContent} />
                    <Dropdown label="Select Tag" data={tags} onSelect={setSelectedTag} value={selectedTag} />
                    <Dropdown label="Select Folder" data={folders} onSelect={setSelectedFolder} value={selectedFolder} />
                </>
            )}
        </View>
    );
}