import React from 'react';
import util from 'util';

import Record from './record.js';
import Models from './models.js';
import Records from './records.js';

/**
 * Class CMS
 */
export default class CMS extends React.Component {
  
  /**
   * renders the main app
   * @function render
   */
  render() {
    return (
      <>
        <header>
          <nav>
            <h1>-MODELS-</h1>
            <Models />
          </nav>
        </header>

        <section>
          <h1>-RECORDS-</h1>
          <Records />
        </section>

        <section>
          <h1>-RECORD-</h1>
          <Record />
        </section>
      </>
    );
  }
}
