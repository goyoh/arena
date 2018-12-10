import $ from 'jquery';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import FastClick from 'fastclick';

import { mobilecheck } from './globals';
import Page from './Page';


$(document).ready(() => {
  window.eventtype = mobilecheck() ? 'touchstart' : 'click';
  if (!window.Promise) { window.Promise = Promise; }

  const app = new Page();
  app.render();
  FastClick.attach(document.body);
});
