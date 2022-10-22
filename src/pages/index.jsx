import React from 'react'
import NestedFolder from './NestedFolder'
import styles from './index.module.css'

const Pages = () => {
  return (
    <section className={styles.main}>
      <NestedFolder />
    </section>
  )
}

export default Pages