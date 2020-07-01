import React from 'react'
// tslint:disable-next-line:no-submodule-imports
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/style.styl'
import * as F from '@features'
export const config = { amp: 'hybrid' }

const Home = () => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-md-8">
        <F.Collector />
      </div>
    </div>
  </div>
)

export default Home
