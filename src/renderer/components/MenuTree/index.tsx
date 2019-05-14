import React, { useState } from 'react';
import { Tree } from 'antd/lib/index';

const { TreeNode } = Tree;
export default function MenuTree(props) {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const radioTree = [];
    function onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys);
        setAutoExpandParent(false);
        setExpandedKeys(expandedKeys);
    }
    function onCheck(checkedKeys) {
        setCheckedKeys(checkedKeys);
        console.log('onCheck', checkedKeys);
    }

    function onSelect(selectedKeys, info) {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeys);
    }

    function renderTreeNodes(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    return (
        <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
        >
            {renderTreeNodes(radioTree)}
        </Tree>
    );
}
