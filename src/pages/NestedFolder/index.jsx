import React, { useState } from 'react';
import Node from '../../services/folderNode';
import Folder from '../../components/Folder';
import AddFolderModal from '../../components/AddFolderModal';

const dummyStructure = [
  new Node(
    'A',
    [
      new Node('AA', [new Node('AAA'), new Node('AAB')], { isFile: false }),
      new Node(
        'AB',
        [
          new Node('ABA'),
          new Node('ABB', [new Node('ABBA')], { isFile: false }),
        ],
        { isFile: false }
      ),
      new Node('AC'),
    ],
    { isFile: false }
  ),
];

const NestedFolder = () => {
  const [structure, setStructure] = useState(dummyStructure);
  const [update, setUpdate] = useState(true);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function toggleOpen(node, id) {
    if (id === node.id) {
      node.options.isOpen = !node.options.isOpen;
      setUpdate((prev) => !prev);
      return;
    }
    for (let child of node.childeren) {
      toggleOpen(child, id);
    }
  }

  function toggleAddFolderModal() {
    setIsAddFolderModalOpen((prev) => !prev);
  }

  function addFolder(id) {
    setSelectedId(id);
    toggleAddFolderModal();
  }

  function handleAddAbove(node, parent, pIdx, details, added) {
    if (added[0]) return;

    if (selectedId === node.id) {
      parent.splice(
        pIdx,
        0,
        new Node(details.name, [], { isFile: details.isFile })
      );
      added[0] = true;
      return;
    }
    for (let i = 0; i < node.childeren.length; i++) {
      handleAddAbove(node.childeren[i], node.childeren, i, details, added);
    }
  }

  function handleAddBelow(node, parent, pIdx, details, added) {
    if (added[0]) return;

    if (selectedId === node.id) {
      parent.splice(
        pIdx + 1,
        0,
        new Node(details.name, [], { isFile: details.isFile })
      );
      added[0] = true;
      return;
    }
    for (let i = 0; i < node.childeren.length; i++) {
      handleAddBelow(node.childeren[i], node.childeren, i, details, added);
    }
  }

  function handleAddInside(node, details) {
    if (selectedId === node.id) {
      node.childeren.push(
        new Node(details.name, [], { isFile: details.isFile })
      );
      return;
    }
    for (let child of node.childeren) {
      handleAddInside(child, details);
    }
  }

  function handleAdd({ name, type, position }) {
    if (position === 'Above') {
      const added = [false];
      for (let i = 0; i < structure.length; i++) {
        handleAddAbove(
          structure[i],
          structure,
          i,
          { name, isFile: type === 'File' },
          added
        );
      }
    } else if (position === 'Below') {
      const added = [false];
      for (let i = 0; i < structure.length; i++) {
        handleAddBelow(
          structure[i],
          structure,
          i,
          { name, isFile: type === 'File' },
          added
        );
      }
    } else {
      for (let node of structure) {
        handleAddInside(node, { name, isFile: type === 'File' });
      }
    }
    setSelectedId(null);
  }

  function _handleDeletehelper(node, parent, pIdx, id) {
    if (id === node.id) {
      parent.splice(pIdx, 1);
      return;
    }
    for (let i = 0; i < node.childeren.length; i++) {
      _handleDeletehelper(node.childeren[i], node.childeren, i, id);
    }
  }

  function handleDelete(id) {
    for (let i = 0; i < structure.length; i++) {
      _handleDeletehelper(structure[i], structure, i, id);
    }
    setUpdate((prev) => !prev);
  }

  return (
    <>
      <div>
        {structure.map((folder, i) => (
          <Folder
            key={folder.id}
            id={folder.id}
            name={folder.name}
            childeren={folder.childeren}
            options={folder.options}
            toggleOpen={toggleOpen.bind(null, structure[i])}
            addFolder={addFolder}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <AddFolderModal
        open={isAddFolderModalOpen}
        onClose={toggleAddFolderModal}
        onAdd={handleAdd}
      />
    </>
  );
};

export default NestedFolder;
