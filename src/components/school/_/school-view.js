// component-name-view.js is your stateless view Template. For the majority of cases, this Template should be able to be pure functional Template (no hooks!).
import React, {Fragment} from 'react';

function School(props) {
  const {school, styles} = props

  return (
    <Fragment>
      {/* If name is really long, cut off at the comma */}
      <p><strong>{school.name.split(',')[0]}</strong></p>
      <p className={styles.small}>{school.city}, {school.state} | {school.program} Program</p>
    </Fragment>
  )
}

export default School