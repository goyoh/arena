import $ from 'jquery';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import FastClick from 'fastclick';
import Page from './app/Page';
import { mobilecheck } from './app/globals';


$(document).ready(() => {
  if (!window.Promise) { window.Promise = Promise; }
  window.eventtype = mobilecheck() ? 'touchstart' : 'click';
  const app = new Page();
  app.render();
  FastClick.attach(document.body);
});
