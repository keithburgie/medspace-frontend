import React from 'react';
import {Button} from 'reactstrap';
import styles from './School.module.scss';

function SchoolHeader(props) {
  const {userSchool, school, collapse, toggle, deleteSchool} = props

  return (
    <header className={styles.collapseHeader}>
      <div className={styles.buttonWrapper}>
        {/* Toggle school selection */}
        <Button color="danger" data-id={userSchool} onClick={(e) => deleteSchool(e)}> Remove </Button>
        <Button color="secondary" data-id={school.id} onClick={(e) => toggle(e)}> {collapse ? "Collapse" : "Expand" } </Button>
      </div>
      <div>
        <p>{/* If name is really long, cut off at the comma */}
          <strong>{school.name.split(',')[0]}</strong>
        </p>
      </div>
    </header>
  )
}

export default SchoolHeader