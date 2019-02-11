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
            <h2>MODELS</h2>
            <Models />
          </nav>
        </header>

        <section>
          <h2>RECORDS</h2>
          <Records />
        </section>

        <section>
          <h2>RECORD</h2>
          <Record />
        </section>
      </>
    );
  }
}
