// TODO(gdi2290): switch to DLLs

/**
 * Polyfills
 */

/* import 'ie-shim'; *//* Internet Explorer 9 support */

/* import 'core-js/es6'; */

/**
 * Added parts of es6 which are necessary for your project or your browser support requirements.
 */
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';
/**
 * See issue https://github.com/AngularClass/angular-starter/issues/709
 */
 /* import 'core-js/es6/promise'; */

import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import 'prismjs';
// import 'prismjs/components/prism-core';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-apacheconf';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-jade';
import 'prismjs/components/prism-ini';

if ('production' === ENV) {
  // Production

} else {

  // Development
  Error.stackTraceLimit = Infinity;

  /* tslint:disable no-var-requires */
  require('zone.js/dist/long-stack-trace-zone');

}
