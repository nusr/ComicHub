import React, { useState } from 'react';
import { Tree } from 'antd/lib/index';

const { TreeNode } = Tree;
export default function MenuTree(props) {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        setAutoExpandParent(false);
        setExpandedKeys(expandedKeys);
    };

    const onCheck = (checkedKeys) => {
        setCheckedKeys(checkedKeys);
        console.log('onCheck', checkedKeys);
    };

    const onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeys);
    };

    const renderTreeNodes = (data) =>
        data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });

    const radioTree = [];
    return (
        <Tree checkable onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} onCheck={onCheck} checkedKeys={checkedKeys} onSelect={onSelect} selectedKeys={selectedKeys}>
            {renderTreeNodes(radioTree)}
        </Tree>
    );
}
