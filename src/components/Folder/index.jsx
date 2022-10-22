import React, { useState } from 'react'
import Add from '../../icons/Add';
import Edit from '../../icons/Edit';
import Delete from '../../icons/Delete';
import styles from './index.module.css'

const Folder = ({ id, name, childeren, options, toggleOpen, addFolder, onDelete }) => {
  const [showActionIcons, setShowActionIcons] = useState(false);

  function handleToggleOpen () {
    if(options.isFile) return;

    toggleOpen(id)
  }

  function openModal () {
    addFolder(id)
    setShowActionIcons(false)
  }

  function handleDelete () {
    onDelete(id)
  }

  return (
    <article className={styles.main}>
      <div className={styles.header} onMouseEnter={() => setShowActionIcons(true)} onMouseLeave={() => setShowActionIcons(false)} onMouseOver={() => setShowActionIcons(true)}>
        <div className={styles.icon} onClick={handleToggleOpen}>
          {options.isFile ? 
            <span className="material-symbols-rounded large">description</span> :
            <>{options.isOpen ? 
              <span className="material-symbols-rounded large">folder_open</span> : 
              <span className="material-symbols-rounded large">folder</span>
            }</>
          }
        </div>
        <div className={styles.name}>{name}</div>
        {showActionIcons && <div className={styles.actions_icon}>
          <Edit />
          {!options.isFile && <Add onClick={openModal}/>}
          <Delete onClick={handleDelete}/>
        </div>}
      </div>
      {options.isOpen && <div className={styles.body}>
        {childeren.map((folder) => (
          <Folder 
            key={folder.id} 
            id={folder.id} 
            name={folder.name} 
            childeren={folder.childeren} 
            options={folder.options} 
            toggleOpen={toggleOpen}
            addFolder={addFolder}
            onDelete={onDelete}
          />
        ))}
      </div>}
    </article>
  )
}

export default Folder