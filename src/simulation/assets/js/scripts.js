import $ from 'jquery';
import route from 'riot-route';
import Promise from 'promise-polyfill'; 

if (!window.Promise) window.Promise = Promise;

const Encoding = require('encoding-japanese');
const fontServer = 'https://mark.arena-jp.com/simulation/servconst/MarkSample';
const eventtype = mobilecheck() ? 'touchstart' : 'click';

'use strict';

const globalEvents = () => {
	$(document).on(eventtype, '.js-popup-trigger', (event)=> {
		Popup.popup(event);
	});
	$(document).on(eventtype, '.js-popup-close', (event) => {
		Popup.popupClose(event);
	});
	$(document).on(eventtype2, '.js-rotation', (event) => {
		this.rotation(event);
	});
	$(document).on(eventtype, '.js-modal', (event)=> {
		this.modals(event);
	});
}

$(() => {
	route.start(true);
	route.base('/simulation');

	ScrollEvents.topScroll();
	ScrollEvents.scrollNav();
	ScrollEvents.scrollNavDisplay();
	ScrollEvents.scrollBottom();
	globalEvents();

	if ($('body').hasClass('single-post')) {
		
		simulation = new SimulationCommon();
		
		OrderMenu.styleRegistration();
		OrderMenu.orderSheet();	
		OrderMenu.orderInfoShow();
		OrderMenu.orderLinkMake();

		if (!mobilecheck()) ScrollEvents.scrollBarStyle();
	}

});
